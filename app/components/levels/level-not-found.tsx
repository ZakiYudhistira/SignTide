import { Link } from "react-router";

export function LevelNotFound() {
  return (
    <main className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 text-center">
      <h1 className="text-heading text-navy-1">Level tidak ditemukan</h1>
      <p className="mt-3 text-body text-navy-3">
        Level ini belum tersedia atau identifikasinya tidak valid.
      </p>
      <Link to="/level" className="welcoming-button mt-8 inline-flex items-center justify-center">
        Kembali ke peta
      </Link>
    </main>
  );
}
