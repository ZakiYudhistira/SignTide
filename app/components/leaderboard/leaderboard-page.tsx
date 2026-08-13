import type { LeaderboardEntry } from "~/features/leaderboard/leaderboard.client";

const medalImages = [
  "/Leaderboard/medal_gold.png",
  "/Leaderboard/medal_silver.png",
  "/Leaderboard/medal_bronze.png",
];

type LeaderboardPageProps = {
  entries: LeaderboardEntry[];
  currentUserId: string;
};

export function LeaderboardPage({ entries, currentUserId }: LeaderboardPageProps) {
  return (
    <div className="min-h-full bg-background px-5 pb-32 pt-8">
      <header className="flex flex-col items-center">
        <h1 className="text-heading text-navy-1">Leaderboard</h1>
        <img
          src="/Leaderboard/Leaderboard.png"
          alt="Leaderboard podium"
          className="mt-8 h-48 w-64 object-contain"
        />
      </header>

      <div className="mt-6 border-t-4 border-gray-2 pt-5">
        <ol className="space-y-2">
          {entries.map((entry, index) => (
            <li
              key={entry.userId}
              className={`flex min-h-16 items-center gap-3 px-2 text-title ${
                entry.userId === currentUserId ? "text-orange-1" : "text-navy-1"
              }`}
            >
              {index < medalImages.length ? (
                <img
                  src={medalImages[index]}
                  alt={`${index + 1}${index === 0 ? "st" : index === 1 ? "nd" : "rd"} place`}
                  className="size-10 object-contain"
                />
              ) : (
                <span className="w-10 text-center">{index + 1}.</span>
              )}
              <span className="min-w-0 flex-1 truncate">{entry.username}</span>
              <span className="shrink-0 text-body-large font-semibold">
                {entry.xp.toLocaleString("en-US")} XP
              </span>
            </li>
          ))}
        </ol>
        {entries.length === 0 && (
          <p className="px-2 py-6 text-body text-navy-3">
            Belum ada peserta di leaderboard.
          </p>
        )}
      </div>
    </div>
  );
}
