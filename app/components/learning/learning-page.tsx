import { ChapterBanner } from "./chapter-banner";
import { SectionDivider } from "./section-divider";
import { SkillMap } from "./skill-map";
import { TopStatsBar } from "./top-stats-bar";
import { RewardChecklist } from "./reward-checklist";
import { ActCooking } from "./act-cooking";
import type { ActCookingConfig, ActMapConfig, ActPrize, LessonNodeData } from "~/models/learning";

type LearningPageProps = {
  lessons: LessonNodeData[];
  map: ActMapConfig;
  cooking: ActCookingConfig;
  prize: ActPrize;
  cooked: boolean;
};

export function LearningPage({ lessons, map, cooking, prize, cooked }: LearningPageProps) {
  return (
    <main className="bg-background">
      <TopStatsBar />
      <ChapterBanner />
      <SkillMap lessons={lessons} map={map} />
      <RewardChecklist lessons={lessons} />
      {cooked ? (
        <img
          src={prize.image}
          alt={prize.alt}
          className="mx-auto mb-8 h-48 w-full max-w-xs object-contain drop-shadow-lg"
        />
      ) : (
        <ActCooking config={cooking} />
      )}
      <SectionDivider label="Kata Dasar" />
    </main>
  );
}
