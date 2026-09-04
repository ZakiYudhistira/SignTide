import { ChapterBanner } from "./chapter-banner";
import { SectionDivider } from "./section-divider";
import { SkillMap } from "./skill-map";
import { TopStatsBar } from "./top-stats-bar";
import { RewardChecklist } from "./reward-checklist";
import { ActCooking } from "./act-cooking";
import type { ActCookingConfig, LessonNodeData } from "~/models/learning";

type LearningPageProps = {
  lessons: LessonNodeData[];
  cooking: ActCookingConfig;
};

export function LearningPage({ lessons, cooking }: LearningPageProps) {
  return (
    <main className="bg-background">
      <TopStatsBar />
      <ChapterBanner />
      <SkillMap lessons={lessons} />
      <RewardChecklist lessons={lessons} />
      <ActCooking config={cooking} />
      <SectionDivider label="Kata Dasar" />
    </main>
  );
}
