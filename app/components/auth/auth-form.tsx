import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import { supabase } from "~/lib/supabase/client";
import { AuthField } from "./auth-field";

export function AuthForm() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError("");
    setSuccessMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    if (isRegistering) {
      const confirmPassword = String(formData.get("confirmPassword") ?? "");

      if (password !== confirmPassword) {
        setPasswordError("Kata sandi dan konfirmasi kata sandi harus sama.");
        return;
      }
    }

    setPasswordError("");
    setIsSubmitting(true);

    const result = isRegistering
      ? await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/login`,
          },
        })
      : await supabase.auth.signInWithPassword({ email, password });

    setIsSubmitting(false);

    if (result.error) {
      setAuthError(result.error.message);
      return;
    }

    if (isRegistering && !result.data.session) {
      setSuccessMessage(
        "Akun berhasil dibuat. Silakan periksa email untuk konfirmasi akun.",
      );
      return;
    }

    navigate("/dashboard", { replace: true });
  };

  const toggleRegisterMode = () => {
    setIsRegistering((registering) => !registering);
    setPasswordError("");
    setAuthError("");
    setSuccessMessage("");
  };

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit}
    >
      {authError && (
        <p className="text-label text-red-1" role="alert">
          {authError}
        </p>
      )}
      {successMessage && (
        <p className="text-label text-green-1" role="status">
          {successMessage}
        </p>
      )}
      <AuthField label="Email" name="email" type="email" autoComplete="email" />
      <AuthField
        label="Kata Sandi"
        name="password"
        type="password"
        autoComplete={isRegistering ? "new-password" : "current-password"}
      />
      {isRegistering && (
        <div>
          <AuthField
            label="Konfirmasi Kata Sandi"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
          />
          {passwordError && (
            <p className="mt-2 text-label text-red-1" role="alert">
              {passwordError}
            </p>
          )}
        </div>
      )}

      <div className="pt-5">
        <button className="welcoming-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Memproses..." : isRegistering ? "Daftar" : "Log In"}
        </button>
        <button
          className="mt-4 w-full text-body-large text-ocean underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
          type="button"
          onClick={toggleRegisterMode}
        >
          {isRegistering ? "Kembali ke Log In" : "Daftar"}
        </button>
      </div>
    </form>
  );
}
