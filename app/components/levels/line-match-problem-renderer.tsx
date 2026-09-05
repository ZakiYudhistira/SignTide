import { useEffect, useRef, useState } from "react";

import type {
  LineMatchPair,
  LineMatchProblem,
  ProblemGrade,
} from "~/models/level";

type Props = {
  problem: LineMatchProblem;
  selectedChoiceId: string | null;
  onSelectChoice: (choiceId: string) => void;
  grade: ProblemGrade | null;
  disabled: boolean;
};

type DragLine = {
  imageId: string;
  pointerId: number;
  x: number;
  y: number;
};

type Point = { x: number; y: number };

function curvedPath(start: Point, end: Point) {
  const midpoint = start.x + (end.x - start.x) / 2;
  return `M ${start.x} ${start.y} C ${midpoint} ${start.y}, ${midpoint} ${end.y}, ${end.x} ${end.y}`;
}

function parsePairs(value: string | null): LineMatchPair[] {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) && parsed.every(
      (pair) =>
        pair !== null &&
        typeof pair === "object" &&
        !Array.isArray(pair) &&
        typeof (pair as Record<string, unknown>).imageId === "string" &&
        typeof (pair as Record<string, unknown>).answerId === "string",
    )
      ? parsed as LineMatchPair[]
      : [];
  } catch {
    return [];
  }
}

export function LineMatchProblemRenderer({
  problem,
  selectedChoiceId,
  onSelectChoice,
  grade,
  disabled,
}: Props) {
  const boardRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef(new Map<string, HTMLButtonElement>());
  const answerRefs = useRef(new Map<string, HTMLButtonElement>());
  const [pairs, setPairs] = useState<LineMatchPair[]>(() =>
    parsePairs(selectedChoiceId),
  );
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
  const [dragLine, setDragLine] = useState<DragLine | null>(null);
  const [layoutVersion, setLayoutVersion] = useState(0);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const observer = new ResizeObserver(() =>
      setLayoutVersion((version) => version + 1),
    );
    observer.observe(board);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!disabled) return;
    setDragLine(null);
    setActiveImageId(null);
  }, [disabled]);

  const pointWithinBoard = (clientX: number, clientY: number): Point => {
    const boardBounds = boardRef.current?.getBoundingClientRect();
    return {
      x: clientX - (boardBounds?.left ?? 0),
      y: clientY - (boardBounds?.top ?? 0),
    };
  };

  const anchorFor = (
    element: HTMLElement | undefined,
    side: "left" | "right",
  ): Point | null => {
    const boardBounds = boardRef.current?.getBoundingClientRect();
    const bounds = element?.getBoundingClientRect();
    if (!boardBounds || !bounds) return null;

    return {
      x: (side === "right" ? bounds.right : bounds.left) - boardBounds.left,
      y: bounds.top + bounds.height / 2 - boardBounds.top,
    };
  };

  const connect = (imageId: string, answerId: string) => {
    if (disabled) return;

    const next = [
      ...pairs.filter(
        (pair) => pair.imageId !== imageId && pair.answerId !== answerId,
      ),
      { imageId, answerId },
    ];
    setPairs(next);
    onSelectChoice(JSON.stringify(next));
    setActiveImageId(null);
  };

  const finishDrag = (clientX: number, clientY: number) => {
    if (!dragLine) return;

    const target = document
      .elementFromPoint(clientX, clientY)
      ?.closest<HTMLElement>("[data-answer-id]");
    if (target?.dataset.answerId) {
      connect(dragLine.imageId, target.dataset.answerId);
    }
    setDragLine(null);
  };

  const cancelDrag = () => {
    setDragLine(null);
    setActiveImageId(null);
  };

  const correctPairs = grade && !grade.isCorrect
    ? parsePairs(grade.correctChoiceId)
    : [];

  return (
    <div>
      {problem.eyebrow && (
        <p className="mt-3 text-title font-bold text-pink-2">
          {problem.eyebrow}
        </p>
      )}
      <h1 className="mt-4 text-heading">{problem.prompt}</h1>

      <div
        ref={boardRef}
        className="relative mx-auto mt-8 grid max-w-md grid-cols-[minmax(0,1fr)_4.5rem] gap-x-4 px-1 sm:grid-cols-[minmax(0,1fr)_5rem] sm:gap-x-12 sm:px-3"
      >
        <svg
          key={layoutVersion}
          className="pointer-events-none absolute inset-0 z-10 size-full overflow-visible"
          aria-hidden="true"
        >
          {pairs.map((pair) => {
            const start = anchorFor(imageRefs.current.get(pair.imageId), "right");
            const end = anchorFor(answerRefs.current.get(pair.answerId), "left");
            if (!start || !end) return null;

            return (
              <path
                key={pair.imageId}
                d={curvedPath(start, end)}
                fill="none"
                stroke={grade ? (grade.isCorrect ? "#83e000" : "#ef3939") : "#ff9700"}
                strokeLinecap="round"
                strokeWidth="8"
              />
            );
          })}

          {correctPairs.map((pair) => {
            const start = anchorFor(imageRefs.current.get(pair.imageId), "right");
            const end = anchorFor(answerRefs.current.get(pair.answerId), "left");
            if (!start || !end) return null;

            return (
              <path
                key={`correct-${pair.imageId}`}
                d={curvedPath(start, end)}
                fill="none"
                stroke="#83e000"
                strokeLinecap="round"
                strokeWidth="8"
              />
            );
          })}

          {dragLine && (() => {
            const start = anchorFor(
              imageRefs.current.get(dragLine.imageId),
              "right",
            );
            return start ? (
              <path
                d={curvedPath(start, dragLine)}
                fill="none"
                stroke="#ff9700"
                strokeLinecap="round"
                strokeWidth="8"
              />
            ) : null;
          })()}
        </svg>

        <div className="flex min-w-0 flex-col gap-5">
          {problem.images.map((image) => (
            <button
              key={image.id}
              ref={(element) => {
                if (element) imageRefs.current.set(image.id, element);
                else imageRefs.current.delete(image.id);
              }}
              type="button"
              disabled={disabled}
              aria-pressed={activeImageId === image.id}
              aria-label={`Pilih ${image.visual.alt}`}
              onClick={(event) => {
                if (event.detail === 0) setActiveImageId(image.id);
              }}
              onPointerDown={(event) => {
                if (disabled) return;
                event.currentTarget.setPointerCapture(event.pointerId);
                setActiveImageId(image.id);
                setDragLine({
                  imageId: image.id,
                  pointerId: event.pointerId,
                  ...pointWithinBoard(event.clientX, event.clientY),
                });
              }}
              onPointerMove={(event) => {
                if (dragLine?.pointerId !== event.pointerId) return;
                setDragLine({
                  ...dragLine,
                  ...pointWithinBoard(event.clientX, event.clientY),
                });
              }}
              onPointerUp={(event) => finishDrag(event.clientX, event.clientY)}
              onPointerCancel={cancelDrag}
              onDragStart={(event) => event.preventDefault()}
              className={`relative z-20 grid h-24 w-full max-w-32 touch-none place-items-center justify-self-start rounded-2xl border-4 bg-white p-2 shadow-[0_5px_0_#d1d1d1] transition ${
                activeImageId === image.id ? "border-orange-1" : "border-gray-2"
              }`}
            >
              {image.visual.kind === "image" ? (
                <img
                  src={image.visual.src}
                  alt=""
                  draggable={false}
                  className="pointer-events-none size-20 max-w-full select-none object-contain"
                />
              ) : (
                <span className="text-display" aria-hidden="true">
                  {image.visual.value}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          {problem.answers.map((answer) => (
            <button
              key={answer.id}
              ref={(element) => {
                if (element) answerRefs.current.set(answer.id, element);
                else answerRefs.current.delete(answer.id);
              }}
              type="button"
              disabled={disabled || !activeImageId}
              data-answer-id={answer.id}
              onClick={() => activeImageId && connect(activeImageId, answer.id)}
              className="relative z-20 grid size-[4.5rem] place-items-center rounded-2xl border-4 border-gray-2 bg-white text-heading shadow-[0_5px_0_#d1d1d1] enabled:border-blue-3 enabled:active:translate-y-1 disabled:cursor-default sm:size-20"
              aria-label={`Pasangkan dengan ${answer.label}`}
            >
              {answer.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
