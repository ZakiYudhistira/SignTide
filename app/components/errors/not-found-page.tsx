import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <section className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-10 text-center">
      <h1 className="text-heading text-navy-1">Oops, halaman tidak ditemukan</h1>

      <Link
        to="/level"
        className="welcoming-button mt-8 inline-flex max-w-xs items-center justify-center"
      >
        Kembali ke Level
      </Link>
    </section>
  );
}
