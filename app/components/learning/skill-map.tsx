import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { actOneDecorations } from "~/data/learning/act-one";
import { mapPosition, MAP_HEIGHT, MAP_WIDTH } from "~/lib/learning/map-position";
import type { LessonNodeData } from "~/models/learning";

import { LessonNode } from "./lesson-node";
import { LessonPopup } from "./lesson-popup";
import { MapDecoration } from "./map-decoration";

export function SkillMap({ lessons }: { lessons: LessonNodeData[] }) {
  const navigate = useNavigate();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const mapRef = useRef<HTMLElement>(null);
  const selectedLesson = lessons.find(
    (lesson) => lesson.id === selectedLessonId,
  );

  useEffect(() => {
    const handleOutsidePointerDown = (event: PointerEvent) => {
      if (!mapRef.current?.contains(event.target as Node)) {
        setSelectedLessonId(null);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
    };
  }, []);

  const selectLesson = (lesson: LessonNodeData) => {
    if (lesson.status !== "locked") setSelectedLessonId(lesson.id);
  };

  return (
    <section
      ref={mapRef}
      className="mx-5 mt-5"
      aria-label="Learning progression"
      onClick={(event) => {
        if (
          !(event.target instanceof Element) ||
          !event.target.closest("button")
        ) {
          setSelectedLessonId(null);
        }
      }}
    >
      <div className="relative aspect-[390/1050] w-full overflow-visible">
        <svg
          className="pointer-events-none absolute inset-0 z-0 size-full"
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M245 135 C150 145 315 240 115 330 C20 375 65 465 225 530 C365 590 380 655 300 720 C220 790 330 850 145 910"
            fill="none"
            stroke="var(--color-gray-2)"
            strokeDasharray="9 8"
            strokeLinecap="round"
            strokeWidth="6"
          />
        </svg>

        {actOneDecorations.map((decoration) => (
          <MapDecoration key={decoration.id} decoration={decoration} />
        ))}

        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={mapPosition(lesson.x, lesson.y)}
          >
            <LessonNode
              lesson={lesson}
              isSelected={selectedLesson?.id === lesson.id}
              onSelect={selectLesson}
            />
          </div>
        ))}

        {selectedLesson && selectedLesson.status !== "locked" && (
          <LessonPopup
            lesson={selectedLesson}
            onStartLesson={() => navigate(`/level/${selectedLesson.id}`)}
          />
        )}
      </div>
    </section>
  );
}
