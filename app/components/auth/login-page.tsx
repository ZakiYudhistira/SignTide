import { AuthForm } from "./auth-form";
import { AuthHomeButton } from "./auth-home-button";

export function LoginPage() {
  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-8 pt-3">
      <AuthHomeButton />

      <div className="mt-10">
        <h1 className="text-heading text-navy-1">Masuk ke Akun!</h1>
        <p className="mt-3 text-body-large text-navy-3">
          Masukkan email dan password untuk memulai!
        </p>
      </div>

      <div className="mt-12">
        <AuthForm />
      </div>
    </section>
  );
}
