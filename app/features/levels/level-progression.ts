import type {
  LessonNodeConfig,
  LessonNodeData,
  UserProgression,
} from "~/models/learning";

export function deriveLessonStatuses(
  sectionId: string,
  lessons: readonly LessonNodeConfig[],
  progression: UserProgression,
): LessonNodeData[] {
  const completedLevels = progression[sectionId] ?? {};
  const firstIncompleteIndex = lessons.findIndex(
    (lesson) => lesson.available && completedLevels[lesson.id] !== true,
  );

  return lessons.map(({ available, ...lesson }, index) => ({
    ...lesson,
    status:
      completedLevels[lesson.id] === true
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
