import { LogoutButton } from "~/components/auth/logout-button";

export function DashboardPlaceholder() {
  return (
    <section className="flex min-h-0 flex-1 items-center justify-center px-6 text-center">
      <div className="flex w-full flex-col items-center">
        <h1 className="text-heading text-navy-1">Dashboard</h1>
        <p className="mt-3 text-body-large text-navy-3">
          Konten dashboard akan segera hadir.
        </p>
        <div className="mt-8">
          <LogoutButton />
        </div>
      </div>
    </section>
  );
}
