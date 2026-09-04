import type {
  ActDefinition,
  LessonNodeConfig,
  LessonNodeData,
  UserProgression,
  UserItems,
} from "~/models/learning";

export function isActCompleted(
  act: Pick<ActDefinition, "id" | "lessons">,
  progression: UserProgression,
) {
  const availableLessons = act.lessons.filter((lesson) => lesson.available);
  const completedLevels = progression[act.id] ?? {};

  return availableLessons.length > 0 && availableLessons.every(
    (lesson) => completedLevels[lesson.id] === true,
  );
}

export function deriveActAccess(
  acts: readonly Pick<ActDefinition, "id" | "lessons">[],
  progression: UserProgression,
) {
  let allPreviousActsCompleted = true;

  return Object.fromEntries(acts.map((act) => {
    const isUnlocked = allPreviousActsCompleted;
    allPreviousActsCompleted = allPreviousActsCompleted && isActCompleted(act, progression);
    return [act.id, isUnlocked];
  })) as Record<string, boolean>;
}

export function canAccessAct(
  actId: string,
  acts: readonly Pick<ActDefinition, "id" | "lessons">[],
  progression: UserProgression,
) {
  return deriveActAccess(acts, progression)[actId] === true;
}

export function deriveLessonStatuses(
  sectionId: string,
  lessons: readonly LessonNodeConfig[],
  progression: UserProgression,
  items: UserItems = [],
  isActUnlocked = true,
): LessonNodeData[] {
  const completedLevels = progression[sectionId] ?? {};
  const firstIncompleteIndex = lessons.findIndex(
    (lesson) => lesson.available && completedLevels[lesson.id] !== true,
  );

  return lessons.map(({ available, ...lesson }, index) => ({
    ...lesson,
    reward: lesson.reward
      ? { ...lesson.reward, collected: items.includes(lesson.reward.name) }
      : undefined,
    status:
      !isActUnlocked
        ? "locked"
        : completedLevels[lesson.id] === true
        ? "completed"
        : available && index === firstIncompleteIndex
          ? "active"
          : "locked",
  }));
}

export function canAccessLesson(
  lessonId: string,
  lessons: readonly LessonNodeData[],
) {
  const lesson = lessons.find((candidate) => candidate.id === lessonId);
  return lesson?.status === "active" || lesson?.status === "completed";
}
