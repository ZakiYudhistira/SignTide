import { supabase } from "~/lib/supabase/client";

import type { ProfileViewModel } from "./profile.types";
import { cropAvatarToSquare } from "./avatar-image.client";

const PROFILE_CACHE_TTL_MS = 5 * 60 * 1000;
const AVATAR_BUCKET = "avatars";
const MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024;

const avatarExtensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

type ProfileCacheEntry = {
  profile: ProfileViewModel;
  expiresAt: number;
};

const profileCache = new Map<string, ProfileCacheEntry>();
const pendingProfileRequests = new Map<string, Promise<ProfileViewModel>>();

function normalizeAchievements(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value.map((achievement, index) => {
    if (typeof achievement === "string") return achievement;
    if (achievement && typeof achievement === "object" && "id" in achievement) {
      return String(achievement.id);
    }
    return `achievement-${index + 1}`;
  });
}

async function fetchProfile(userId: string, email?: string) {
  const { data: profile, error: profileError } = await supabase
    .from("profile")
    .select("username, streaks, xp, achievements, avatar_path")
    .eq("UID", userId)
    .maybeSingle();

  if (profileError) {
    throw new Response(`Profil tidak dapat dimuat: ${profileError.message}`, {
      status: 500,
      statusText: "Supabase profile query failed",
    });
  }

  if (!profile) {
    throw new Response(
      "Baris profil untuk pengguna ini tidak terlihat. Pastikan kebijakan SELECT RLS mengizinkan auth.uid() = \"UID\".",
      { status: 403, statusText: "Profile row not visible" },
    );
  }

  const avatarUrl = profile.avatar_path
    ? supabase.storage.from(AVATAR_BUCKET).getPublicUrl(profile.avatar_path).data
        .publicUrl
    : null;

  return {
    username: profile.username || email?.split("@")[0] || "User",
    streaks: Number(profile.streaks),
    xp: Number(profile.xp),
    achievements: normalizeAchievements(profile.achievements),
    avatarUrl,
  } satisfies ProfileViewModel;
}

export function invalidateProfileCache(userId?: string) {
  if (userId) {
    profileCache.delete(userId);
    pendingProfileRequests.delete(userId);
    return;
  }

  profileCache.clear();
  pendingProfileRequests.clear();
}

async function getAuthenticatedUser() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (sessionError || !user) {
    throw new Error("Sesi tidak valid. Silakan masuk kembali.");
  }

  return user;
}

export async function updateProfileUsername(username: string): Promise<string> {
  const nextUsername = username.trim();
  if (!nextUsername) throw new Error("Nama tidak boleh kosong.");
  if (nextUsername.length > 50) {
    throw new Error("Nama maksimal 50 karakter.");
  }

  const user = await getAuthenticatedUser();
  const { data: updatedProfile, error } = await supabase
    .from("profile")
    .update({ username: nextUsername })
    .eq("UID", user.id)
    .select("username")
    .maybeSingle();

  if (error || !updatedProfile) {
    throw new Error(error?.message ?? "Nama tidak berhasil diperbarui.");
  }

  const cached = profileCache.get(user.id);
  if (cached) {
    profileCache.set(user.id, {
      profile: { ...cached.profile, username: updatedProfile.username },
      expiresAt: Date.now() + PROFILE_CACHE_TTL_MS,
    });
  }

  return updatedProfile.username;
}

export async function updatePassword(
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  if (!currentPassword || !newPassword) {
    throw new Error("Lengkapi semua kolom password.");
  }

  const { error } = await supabase.auth.updateUser({
    current_password: currentPassword,
    password: newPassword,
  });

  if (error) {
    const message = error.message.toLowerCase();
    const errorCode = "code" in error ? error.code : undefined;

    if (
      errorCode === "invalid_credentials" ||
      message.includes("current password") ||
      message.includes("incorrect password") ||
      message.includes("invalid password")
    ) {
      throw new Error("Password saat ini tidak sesuai.");
    }

    throw new Error(error.message);
  }
}

export async function updateProfileAvatar(file: File): Promise<string> {
  if (!avatarExtensions[file.type]) {
    throw new Error("Pilih foto berformat JPEG, PNG, atau WebP.");
  }

  if (file.size > MAX_AVATAR_SIZE_BYTES) {
    throw new Error("Ukuran foto maksimal 2 MB.");
  }

  const croppedFile = await cropAvatarToSquare(file);

  const user = await getAuthenticatedUser();

  const { data: currentProfile, error: readError } = await supabase
    .from("profile")
    .select("avatar_path")
    .eq("UID", user.id)
    .maybeSingle();

  if (readError) throw new Error(readError.message);
  if (!currentProfile) throw new Error("Profil tidak ditemukan.");

  const avatarPath = `${user.id}/avatar-${Date.now()}.webp`;
  const { error: uploadError } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(avatarPath, croppedFile, {
      cacheControl: "31536000",
      contentType: croppedFile.type,
      upsert: false,
    });

  if (uploadError) throw new Error(uploadError.message);

  const { data: updatedProfile, error: updateError } = await supabase
    .from("profile")
    .update({ avatar_path: avatarPath })
    .eq("UID", user.id)
    .select("avatar_path")
    .maybeSingle();

  if (updateError || !updatedProfile) {
    await supabase.storage.from(AVATAR_BUCKET).remove([avatarPath]);
    throw new Error(updateError?.message ?? "Profil tidak berhasil diperbarui.");
  }

  const avatarUrl = supabase.storage
    .from(AVATAR_BUCKET)
    .getPublicUrl(updatedProfile.avatar_path).data.publicUrl;
  const cached = profileCache.get(user.id);
  if (cached) {
    profileCache.set(user.id, {
      profile: { ...cached.profile, avatarUrl },
      expiresAt: Date.now() + PROFILE_CACHE_TTL_MS,
    });
  } else {
    invalidateProfileCache(user.id);
  }

  if (
    currentProfile.avatar_path &&
    currentProfile.avatar_path !== updatedProfile.avatar_path
  ) {
    void supabase.storage
      .from(AVATAR_BUCKET)
      .remove([currentProfile.avatar_path]);
  }

  return avatarUrl;
}

export async function getProfile(options?: {
  forceRefresh?: boolean;
}): Promise<ProfileViewModel> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (sessionError || !user) {
    throw new Response("Sesi tidak valid. Silakan masuk kembali.", {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const now = Date.now();
  const cached = profileCache.get(user.id);
  if (!options?.forceRefresh && cached && cached.expiresAt > now) {
    return cached.profile;
  }

  if (!options?.forceRefresh) {
    const pending = pendingProfileRequests.get(user.id);
    if (pending) return pending;
  }

  const request = fetchProfile(user.id, user.email)
    .then((profile) => {
      profileCache.set(user.id, {
        profile,
        expiresAt: Date.now() + PROFILE_CACHE_TTL_MS,
      });
      return profile;
    })
    .finally(() => {
      pendingProfileRequests.delete(user.id);
    });

  pendingProfileRequests.set(user.id, request);
  return request;
}
