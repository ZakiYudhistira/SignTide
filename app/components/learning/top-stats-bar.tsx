type StatItemData = {
  id: string;
  icon: string;
  alt: string;
};

const stats: StatItemData[] = [
  {
    id: "streak",
    icon: "/Agus/Agus_2.png",
    alt: "SignTide mascot",
  },
  {
    id: "fire",
    icon: "\u{1F525}",
    alt: "Streak",
  },
  {
    id: "sun",
    icon: "\u2600\uFE0F",
    alt: "Energy",
  },
  {
    id: "heart",
    icon: "\u2764\uFE0F",
    alt: "Hearts",
  },
];

function StatItem({ stat }: { stat: StatItemData }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      {stat.id === "streak" ? (
        <img className="size-12 object-contain" src={stat.icon} alt={stat.alt} />
      ) : (
        <span className="text-3xl leading-none" role="img" aria-label={stat.alt}>
          {stat.icon}
        </span>
      )}
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
