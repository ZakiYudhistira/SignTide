type ProfileOverviewProps = {
  streak: number;
  xp: number;
};

export function ProfileOverview({ streak, xp }: ProfileOverviewProps) {
  return (
    <section aria-labelledby="overview-title">
      <h2 id="overview-title" className="text-title uppercase text-navy-3">
        Overview
      </h2>
      <div className="mt-3 overflow-hidden rounded-[2.25rem] border-[3px] border-gray-2 bg-background">
        <div className="flex items-center gap-6 px-9 py-8">
          <span className="text-5xl" aria-hidden="true">🔥</span>
          <div>
            <p className="text-title text-red-2">Streaks</p>
            <p className="text-heading text-yellow-2">{streak.toLocaleString("en-US")}</p>
          </div>
        </div>
        <div className="border-t-[3px] border-gray-2" />
        <div className="flex items-center gap-6 px-9 py-8">
          <span className="text-5xl" aria-hidden="true">⚡</span>
          <div>
            <p className="text-title text-orange-1">XP</p>
            <p className="text-heading text-yellow-2">{xp.toLocaleString("en-US")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
