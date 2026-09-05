type StatItemData = {
  id: string;
  icon: string;
  alt: string;
};

const stats: StatItemData[] = [
  {
    id: "streak",
    icon: "/navbar/idle_dino.png",
    alt: "SignTide mascot",
  },
  {
    id: "fire",
    icon: "/navbar/fire.png",
    alt: "Streak",
  },
  {
    id: "sun",
    icon: "/navbar/sun.png",
    alt: "Energy",
  },
  {
    id: "heart",
    icon: "/navbar/heart.png",
    alt: "Hearts",
  },
];

function StatItem({ stat }: { stat: StatItemData }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <img
        className={stat.id === "streak" ? "size-12 object-contain" : "size-10 object-contain"}
        src={stat.icon}
        alt={stat.alt}
      />
      <span className="text-caption text-navy-3">Coming soon</span>
    </div>
  );
}

export function TopStatsBar() {
  return (
    <section
      className="flex items-center justify-between gap-2 px-6 pb-5 pt-3"
      aria-label="Progress statistics"
    >
      {stats.map((stat) => (
        <StatItem key={stat.id} stat={stat} />
      ))}
    </section>
  );
}
