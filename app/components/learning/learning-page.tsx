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
  cooked: boolean;
};

export function LearningPage({ lessons, cooking, cooked }: LearningPageProps) {
  return (
    <main className="bg-background">
      <TopStatsBar />
      <ChapterBanner />
      <SkillMap lessons={lessons} />
      <RewardChecklist lessons={lessons} />
      <ActCooking config={cooking} lessons={lessons} cooked={cooked} />
      <SectionDivider label="Kata Dasar" />
    </main>
  );
}
