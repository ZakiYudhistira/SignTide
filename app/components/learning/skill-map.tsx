import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { mapPosition } from "~/lib/learning/map-position";
import type { ActMapConfig, LessonNodeData } from "~/models/learning";

import { LessonNode } from "./lesson-node";
import { LessonPopup } from "./lesson-popup";
import { MapDecoration } from "./map-decoration";

export function SkillMap({
  lessons,
  map,
  tutorialTargetFirstLesson = false,
}: {
  lessons: LessonNodeData[];
  map: ActMapConfig;
  tutorialTargetFirstLesson?: boolean;
}) {
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
      <div
        className="relative w-full overflow-visible"
        style={{ aspectRatio: `${map.width} / ${map.height}` }}
      >
        <svg
          className="pointer-events-none absolute inset-0 z-0 size-full"
          viewBox={`0 0 ${map.width} ${map.height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={map.path}
            fill="none"
            stroke="var(--color-gray-2)"
            strokeDasharray="9 8"
            strokeLinecap="round"
            strokeWidth="6"
          />
        </svg>

        {map.decorations.map((decoration) => (
          <MapDecoration key={decoration.id} decoration={decoration} map={map} />
        ))}

        {lessons.map((lesson, lessonIndex) => (
          <div
            key={lesson.id}
            data-tutorial-target={
              tutorialTargetFirstLesson && lessonIndex === 0 ? "levels" : undefined
            }
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={mapPosition(lesson.x, lesson.y, map)}
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
            map={map}
            onStartLesson={() => navigate(`/level/${selectedLesson.id}`)}
          />
        )}
      </div>
    </section>
  );
}
