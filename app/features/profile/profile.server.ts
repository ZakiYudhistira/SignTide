import { data } from "react-router";

import type { ProfileViewModel } from "./profile.types";
import { createClient } from "~/utils/supabase.server";

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

export async function getProfile(request: Request) {
  const { supabase, headers } = createClient(request);
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Response(null, {
      status: 302,
      headers: { Location: "/login", ...Object.fromEntries(headers) },
    });
  }

  const { data: profile, error: profileError } = await supabase
    .schema("public")
    .from("profile")
    .select("username, streaks, xp, achievements, avatar_path")
    .eq("UID", user.id)
    .maybeSingle();

  if (profileError) {
    throw data(
      { message: "Profil tidak dapat dimuat.", detail: profileError.message },
      { status: 500, headers },
    );
  }

  if (!profile) {
    return data(
      {
        profile: {
          username: user.email?.split("@")[0] ?? "User",
          streaks: 0,
          xp: 0,
          achievements: [],
          avatarUrl: null,
        } satisfies ProfileViewModel,
      },
      { headers },
    );
  }

  const avatarUrl = profile.avatar_path
    ? supabase.storage.from("avatars").getPublicUrl(profile.avatar_path).data
        .publicUrl
    : null;

  return data(
    {
      profile: {
        username: profile.username ?? user.email?.split("@")[0] ?? "User",
        streaks: Number(profile.streaks ?? 0),
        xp: Number(profile.xp ?? 0),
        achievements: normalizeAchievements(profile.achievements),
        avatarUrl,
      } satisfies ProfileViewModel,
    },
    { headers },
  );
}
