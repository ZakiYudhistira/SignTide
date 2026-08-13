type ProfileAchievementsProps = {
  achievements: string[];
};

export function ProfileAchievements({ achievements }: ProfileAchievementsProps) {
  return (
    <section aria-labelledby="achievements-title">
      <h2 id="achievements-title" className="text-title uppercase text-navy-3">
        Achievements
      </h2>
      <div className="mt-5 grid grid-cols-4 gap-3">
        {achievements.map((achievement) => (
          <div
            key={achievement}
            className="aspect-square rounded-full bg-black"
            role="img"
            aria-label={`${achievement} achievement placeholder`}
          />
        ))}
      </div>
    </section>
  );
}
