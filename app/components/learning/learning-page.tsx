import { ChapterBanner } from "./chapter-banner";
import { SectionDivider } from "./section-divider";
import { SkillMap } from "./skill-map";
import { TopStatsBar } from "./top-stats-bar";
import { RewardChecklist } from "./reward-checklist";
import { ActCooking } from "./act-cooking";
import type { ActCookingFeature, ActMapConfig, LessonNodeData } from "~/models/learning";

type LearningPageProps = {
  sections: Array<{
    id: string;
    label: string;
    title: string;
    titleColor: string;
    nextSectionLabel: string;
    lessons: LessonNodeData[];
    map: ActMapConfig;
    cooking: ActCookingFeature;
    cooked: boolean;
    isUnlocked: boolean;
  }>;
};

export function LearningPage({ sections }: LearningPageProps) {
  return (
    <main className="bg-background">
      <TopStatsBar />
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-label={section.label}
          aria-disabled={!section.isUnlocked}
        >
          {!section.isUnlocked && (
            <span className="sr-only">Selesaikan act sebelumnya untuk membuka {section.label}.</span>
          )}
          <div
            inert={!section.isUnlocked ? true : undefined}
            className={section.isUnlocked
              ? ""
              : "pointer-events-none select-none opacity-45 blur-[2px]"
            }
          >
            <ChapterBanner label={section.label} title={section.title} color={section.titleColor} />
            <SkillMap lessons={section.lessons} map={section.map} />
            <RewardChecklist lessons={section.lessons} />
            {section.cooking.enabled && (
              section.cooked ? (
                <img
                  src={section.cooking.prize.image}
                  alt={section.cooking.prize.alt}
                  className="mx-auto mb-8 h-48 w-full max-w-xs object-contain drop-shadow-lg"
                />
              ) : (
                <ActCooking config={section.cooking.config} />
              )
            )}
            <SectionDivider label={section.nextSectionLabel} />
          </div>
        </section>
      ))}
    </main>
  );
}
