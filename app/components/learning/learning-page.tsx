import { ChapterBanner } from "./chapter-banner";
import { SectionDivider } from "./section-divider";
import { SkillMap } from "./skill-map";
import { TopStatsBar } from "./top-stats-bar";
import type { LessonNodeData } from "~/models/learning";

export function LearningPage({ lessons }: { lessons: LessonNodeData[] }) {
  return (
    <main className="bg-background">
      <TopStatsBar />
      <ChapterBanner />
      <SkillMap lessons={lessons} />
      <SectionDivider label="Kata Dasar" />
    </main>
  );
}
