import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Link } from "react-router";
import { ArrowLeft, Camera, ChevronRight, Eye, EyeOff, LockKeyhole, Pencil, UserRound, X } from "lucide-react";

import type { ProfileViewModel } from "~/features/profile/profile.types";
import {
  updatePassword,
  updateProfileAvatar,
  updateProfileUsername,
} from "~/features/profile/profile.client";

type EditProfilePageProps = { profile: ProfileViewModel };

export function EditProfilePage({ profile }: EditProfilePageProps) {
  const [pictureOpen, setPictureOpen] = useState(false);
  const [nameOpen, setNameOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [username, setUsername] = useState(profile.username);
  const [nameDraft, setNameDraft] = useState(profile.username);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const closePictureEditor = (force = false) => {
    if (isSaving && !force) return;
    setPictureOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setError("");
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Pilih foto berformat JPEG, PNG, atau WebP.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran foto maksimal 2 MB.");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError("");
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    setIsSaving(true);
    setError("");

    try {
      const savedAvatarUrl = await updateProfileAvatar(selectedFile);
      setAvatarUrl(savedAvatarUrl);
      closePictureEditor(true);
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Foto profil tidak berhasil disimpan.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const openNameEditor = () => {
    setNameDraft(username);
    setFormError("");
    setNameOpen(true);
  };

  const saveName = async () => {
    const nextName = nameDraft.trim();
    if (!nextName) {
      setFormError("Nama tidak boleh kosong.");
      return;
    }

    setIsSavingName(true);
    setFormError("");
    try {
      const updatedUsername = await updateProfileUsername(nextName);
      setUsername(updatedUsername);
      setNameOpen(false);
    } catch (saveError) {
      setFormError(
        saveError instanceof Error
          ? saveError.message
          : "Nama tidak berhasil diperbarui.",
      );
    } finally {
      setIsSavingName(false);
    }
  };

  const openPasswordEditor = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswords(false);
    setFormError("");
    setPasswordOpen(true);
  };

  const savePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setFormError("Lengkapi semua kolom password.");
      return;
    }
    if (newPassword.length < 8) {
      setFormError("Password baru minimal 8 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setFormError("Konfirmasi password tidak cocok.");
      return;
    }
    setIsSavingPassword(true);
    setFormError("");
    try {
      await updatePassword(currentPassword, newPassword);
      setPasswordOpen(false);
    } catch (saveError) {
      setFormError(
        saveError instanceof Error
          ? saveError.message
          : "Password tidak berhasil diperbarui.",
      );
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <div className="min-h-full bg-background">
      <div className="relative border-b-2 border-gray-2 bg-white px-5 py-5 text-center">
        <Link to="/profile" aria-label="Back to profile" className="absolute left-5 top-4 inline-flex size-11 items-center justify-center text-navy-1"><ArrowLeft className="size-8" /></Link>
        <h6 className="text-title italic text-navy-1">Edit Profile</h6>
      </div>

      <main className="space-y-10 px-5 pb-12 pt-12">
        <button type="button" className="relative mx-auto block size-56 rounded-full bg-black" onClick={() => setPictureOpen(true)} aria-label="Edit profile picture">
          {avatarUrl && <img src={avatarUrl} alt={`${profile.username} profile`} className="size-full rounded-full object-cover" />}
          <span className="absolute bottom-0 right-0 flex size-16 items-center justify-center rounded-full border-2 border-gray-2 bg-white text-black shadow-sm"><Pencil className="size-8" /></span>
        </button>

        <div className="overflow-hidden rounded-[2rem] border-2 border-gray-2 bg-white">
          <button type="button" className="edit-profile-row" onClick={openNameEditor}>
            <span className="edit-profile-icon rounded-2xl"><UserRound className="size-8 text-black" /></span>
            <span className="flex-1 text-left"><strong>Nama</strong><small>{username}</small></span>
            <ChevronRight className="size-9 text-black" aria-hidden="true" />
          </button>
          <button type="button" className="edit-profile-row border-t-2 border-gray-2" onClick={openPasswordEditor}>
            <span className="edit-profile-icon"><LockKeyhole className="size-7 text-black" /></span>
            <span className="flex-1 text-left"><strong>Ganti Password</strong></span>
            <ChevronRight className="size-9 text-black" aria-hidden="true" />
          </button>
        </div>
      </main>

      {pictureOpen && (
        <div className="fixed inset-0 z-20 flex items-end justify-center bg-black/35" role="dialog" aria-modal="true" aria-labelledby="profile-picture-title">
          <section className="w-full max-w-[480px] rounded-t-[2rem] bg-white px-6 pb-8 pt-8">
            <div className="flex items-center justify-between"><h2 id="profile-picture-title" className="text-title italic text-navy-1">Profile Picture</h2><button type="button" onClick={() => closePictureEditor()} disabled={isSaving} aria-label="Close" className="text-black disabled:opacity-50"><X className="size-10" /></button></div>
            <div className="mt-8 flex min-h-80 flex-col items-center justify-center rounded-[2rem] border-4 border-dashed border-gray-1">
              {previewUrl || avatarUrl ? <img src={previewUrl ?? avatarUrl ?? undefined} alt="Preview foto profil" className="size-32 rounded-full object-cover" /> : <div className="size-32 rounded-full bg-black" aria-label="Belum ada foto profil" role="img" />}
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="sr-only" />
              <button type="button" disabled={isSaving} onClick={() => fileInputRef.current?.click()} className="mt-8 inline-flex items-center gap-3 rounded-full border-4 border-gray-2 px-8 py-3 text-title text-navy-1 disabled:opacity-50"><Camera className="size-7 text-black" />{selectedFile ? "Ganti foto" : "Unggah foto"}</button>
              <p className="mt-3 text-caption text-navy-3">JPEG, PNG, atau WebP · Maksimal 2 MB · Otomatis dipotong 1:1</p>
              {error && <p className="mt-3 px-4 text-center text-label text-red-1" role="alert">{error}</p>}
            </div>
            <button type="button" disabled={!selectedFile || isSaving} onClick={handleSave} className="welcoming-button mt-8 disabled:cursor-not-allowed disabled:opacity-60">{isSaving ? "Menyimpan..." : "Simpan"}</button>
          </section>
        </div>
      )}

      {nameOpen && (
        <div className="fixed inset-0 z-20 flex items-end justify-center bg-black/35" role="dialog" aria-modal="true" aria-labelledby="name-title">
          <section className="w-full max-w-[480px] rounded-t-[2rem] bg-white px-6 pb-8 pt-8">
            <div className="flex items-center justify-between"><h2 id="name-title" className="text-title italic text-navy-1">Nama</h2><button type="button" onClick={() => setNameOpen(false)} disabled={isSavingName} aria-label="Close" className="text-black disabled:opacity-50"><X className="size-10" /></button></div>
            <label className="mt-8 block text-label text-navy-2" htmlFor="profile-name">Nama pengguna</label>
            <input id="profile-name" value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} disabled={isSavingName} maxLength={50} className="mt-2 h-16 w-full rounded-3xl border-2 border-navy-2 bg-white px-5 text-body text-navy-1 outline-none focus:border-ocean focus:ring-2 focus:ring-light-blue disabled:opacity-50" autoFocus />
            {formError && <p className="mt-3 text-label text-red-1" role="alert">{formError}</p>}
            <button type="button" onClick={saveName} disabled={isSavingName} className="welcoming-button mt-8 disabled:cursor-not-allowed disabled:opacity-60">{isSavingName ? "Menyimpan..." : "Simpan"}</button>
          </section>
        </div>
      )}

      {passwordOpen && (
        <div className="fixed inset-0 z-20 flex items-end justify-center bg-black/35" role="dialog" aria-modal="true" aria-labelledby="password-title">
          <section className="w-full max-w-[480px] rounded-t-[2rem] bg-white px-6 pb-8 pt-8">
            <div className="flex items-center justify-between"><h2 id="password-title" className="text-title italic text-navy-1">Ganti Password</h2><button type="button" onClick={() => setPasswordOpen(false)} disabled={isSavingPassword} aria-label="Close" className="text-black disabled:opacity-50"><X className="size-10" /></button></div>
            <div className="mt-8 space-y-4">
              <PasswordInput id="current-password" label="Password saat ini" value={currentPassword} onChange={setCurrentPassword} visible={showPasswords} disabled={isSavingPassword} />
              <PasswordInput id="new-password" label="Password baru" value={newPassword} onChange={setNewPassword} visible={showPasswords} disabled={isSavingPassword} />
              <PasswordInput id="confirm-password" label="Konfirmasi password baru" value={confirmPassword} onChange={setConfirmPassword} visible={showPasswords} disabled={isSavingPassword} />
            </div>
            <button type="button" disabled={isSavingPassword} onClick={() => setShowPasswords((value) => !value)} className="mt-4 inline-flex items-center gap-2 text-label text-navy-2 disabled:opacity-50">{showPasswords ? <EyeOff className="size-5" /> : <Eye className="size-5" />}{showPasswords ? "Sembunyikan password" : "Tampilkan password"}</button>
            {formError && <p className="mt-3 text-label text-red-1" role="alert">{formError}</p>}
            <button type="button" onClick={savePassword} disabled={isSavingPassword} className="welcoming-button mt-8 disabled:cursor-not-allowed disabled:opacity-60">{isSavingPassword ? "Menyimpan..." : "Simpan"}</button>
          </section>
        </div>
      )}
    </div>
  );
}

function PasswordInput({ id, label, value, onChange, visible, disabled }: { id: string; label: string; value: string; onChange: (value: string) => void; visible: boolean; disabled: boolean }) {
  return (
    <label className="block text-label text-navy-2" htmlFor={id}>
      {label}
      <input id={id} type={visible ? "text" : "password"} value={value} onChange={(event) => onChange(event.target.value)} disabled={disabled} className="mt-2 h-16 w-full rounded-3xl border-2 border-navy-2 bg-white px-5 text-body text-navy-1 outline-none focus:border-ocean focus:ring-2 focus:ring-light-blue disabled:opacity-50" />
    </label>
  );
}
