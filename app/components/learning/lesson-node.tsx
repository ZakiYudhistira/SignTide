import type { LessonNodeData } from "~/models/learning";

type LessonNodeProps = {
  lesson: LessonNodeData;
  isSelected: boolean;
  onSelect: (lesson: LessonNodeData) => void;
};

export function LessonNode({ lesson, isSelected, onSelect }: LessonNodeProps) {
  const isLocked = lesson.status === "locked";
  const isCompleted = lesson.status === "completed";

  return (
    <div className="relative flex size-24 items-center justify-center">
      <button
        className={`relative z-10 flex h-16 w-20 items-center justify-center overflow-hidden rounded-[50%] transition-[transform,box-shadow] duration-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean before:absolute before:left-1 before:top-1 before:h-7 before:w-14 before:-rotate-[8deg] before:rounded-[50%] ${
          isLocked
            ? "cursor-not-allowed bg-[#cfcfcf] shadow-[0_0.35rem_0_#929292] before:bg-[#dedede]"
            : `${
                isCompleted
                  ? "bg-[#58afe2] shadow-[0_0.35rem_0_#168dca] before:bg-[#84c8ec] active:shadow-[0_0.12rem_0_#168dca]"
                  : "bg-[#ff9700] shadow-[0_0.35rem_0_#ee7900] before:bg-[#ffb64a] active:shadow-[0_0.12rem_0_#ee7900]"
              } hover:scale-[1.02] active:translate-y-0.5 active:scale-[0.98] ${isSelected ? "scale-[1.02]" : ""}`
        }`}
        type="button"
        disabled={isLocked}
        aria-label={lesson.title}
        onClick={() => onSelect(lesson)}
      >
        {isCompleted ? (
          <svg
            className="relative z-10 h-9 w-11"
            viewBox="0 0 48 40"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 20.5 18 33 43 7"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="9"
            />
          </svg>
        ) : (
          <img
            className="relative z-10 size-12 object-contain"
            src={lesson.icon}
            alt=""
          />
        )}
      </button>

      {lesson.reward && (
        <img
          className="pointer-events-none absolute z-20 h-auto object-contain"
          style={{
            left: `${lesson.reward.offsetX}%`,
            top: `${lesson.reward.offsetY}%`,
            width: `${lesson.reward.width}%`,
          }}
          src={lesson.reward.image}
          alt={lesson.reward.alt}
        />
      )}
    </div>
  );
}
