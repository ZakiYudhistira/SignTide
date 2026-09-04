import type { ActMapConfig, LessonNodeData } from "~/models/learning";

type LessonPopupProps = {
  lesson: LessonNodeData;
  map: ActMapConfig;
  onStartLesson: () => void;
};

export function LessonPopup({ lesson, map, onStartLesson }: LessonPopupProps) {
  return (
    <div
      className="absolute z-20 w-64 -translate-x-1/2"
      style={{
        left: `${(lesson.x / map.width) * 100}%`,
        top: `${((lesson.y + 58) / map.height) * 100}%`,
      }}
    >
      <div className="lesson-popup-enter relative rounded-3xl bg-orange-2 p-4 text-left text-white shadow-lg">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 border-x-8 border-b-[14px] border-x-transparent border-b-orange-2" />
        <h2 className="text-title">{lesson.title}</h2>
        <p className="mt-1 text-body">{lesson.lessonLabel}</p>
        <button
          className="mt-3 w-full rounded-full bg-white px-4 py-2 text-label text-orange-1 transition-colors hover:bg-orange-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          type="button"
          onClick={onStartLesson}
        >
          Mulai +{lesson.xp} XP
        </button>
      </div>
    </div>
  );
}
