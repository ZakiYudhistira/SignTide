import { Link } from "react-router";

import type { LevelResult } from "~/models/level";

export function LevelSummary({ result }: { result: LevelResult }) {
  const isPerfectScore = result.score === result.total;

  return (
    <main className="flex min-h-0 flex-1 flex-col items-center justify-center bg-background px-6 text-center text-navy-1">
      <img
        src="/Agus/Agus_main.png"
        alt="Agus merayakan hasil level"
        className="mb-8 h-52 w-64 object-contain"
      />
      <h1 className="text-heading">Level Selesai</h1>
      <p className="mt-4 text-title">
        {result.score}/{result.total} Total Jawaban Benar
      </p>
      <p className="mt-3 max-w-xs text-body text-navy-3">
        {isPerfectScore
          ? "Hebat! Semua jawabanmu benar!"
          : "Tetap semangat! Coba lagi untuk mendapatkan semua jawaban benar."}
      </p>
      {isPerfectScore && (
        <p className="mt-3 text-body text-yellow-2">
          {result.xpAwarded
            ? `+${result.xpAwarded} XP diperoleh`
            : "Level ini sudah pernah diselesaikan"}
        </p>
      )}
      <Link
        to="/level"
        reloadDocument
        className="welcoming-button mt-10 inline-flex items-center justify-center"
      >
        Kembali ke peta
      </Link>
    </main>
  );
}
