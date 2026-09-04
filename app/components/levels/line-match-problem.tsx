import { Fragment, useEffect, useRef, useState } from "react";
import { useFetcher, useNavigate } from "react-router";

import type { LineMatchPair, LineMatchProblem } from "~/models/level";

import { LevelFooter } from "./level-footer";
import { LevelHeader } from "./level-header";
import { ProblemFeedback } from "./problem-feedback";

type LineMatchValidationResult = {
  correct: boolean;
  correctAnswer: string;
  correctPairs: LineMatchPair[];
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

export function LineMatchProblemView({ problem }: { problem: LineMatchProblem }) {
  const navigate = useNavigate();
  const validationFetcher = useFetcher<LineMatchValidationResult>();
  const boardRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef(new Map<string, HTMLButtonElement>());
  const answerRefs = useRef(new Map<string, HTMLButtonElement>());
  const [pairs, setPairs] = useState<LineMatchPair[]>([]);
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
  const [dragLine, setDragLine] = useState<DragLine | null>(null);
  const [layoutVersion, setLayoutVersion] = useState(0);
  const result = validationFetcher.data;
  const disabled = Boolean(result) || validationFetcher.state !== "idle";

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const observer = new ResizeObserver(() => setLayoutVersion((version) => version + 1));
    observer.observe(board);
    return () => observer.disconnect();
  }, []);

  const pointWithinBoard = (clientX: number, clientY: number): Point => {
    const boardBounds = boardRef.current?.getBoundingClientRect();
    return {
      x: clientX - (boardBounds?.left ?? 0),
      y: clientY - (boardBounds?.top ?? 0),
    };
  };

  const anchorFor = (element: HTMLElement | undefined, side: "left" | "right"): Point | null => {
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
    setPairs((current) => [
      ...current.filter(
        (pair) => pair.imageId !== imageId && pair.answerId !== answerId,
      ),
      { imageId, answerId },
    ]);
    setActiveImageId(null);
  };

  const selectAnswer = (answerId: string) => {
    if (activeImageId) connect(activeImageId, answerId);
  };

  const finishDrag = (clientX: number, clientY: number) => {
    if (!dragLine) return;
    const target = document
      .elementFromPoint(clientX, clientY)
      ?.closest<HTMLElement>("[data-answer-id]");
    const answerId = target?.dataset.answerId;
    if (answerId) connect(dragLine.imageId, answerId);
    setDragLine(null);
  };

  const checkAnswer = () => {
    validationFetcher.submit(
      { answer: JSON.stringify(pairs) },
      { method: "post" },
    );
  };

  const grade = result
    ? {
        problemId: problem.id,
        selectedChoiceId: JSON.stringify(pairs),
        correctChoiceId: result.correctAnswer,
        correctAnswerLabel: result.correctAnswer,
        isCorrect: result.correct,
      }
    : null;

  const continueAfterFeedback = () => {
    if (result?.correct) {
      navigate("/level");
      return;
    }

    setPairs([]);
    setActiveImageId(null);
    validationFetcher.reset();
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-background text-navy-1">
      <LevelHeader progress={100} lives={5} onExit={() => navigate("/level")} />

      <main className="min-h-0 flex-1 overflow-y-auto px-5 pb-[calc(12rem+env(safe-area-inset-bottom))]">
        <h1 className="mt-4 text-heading">{problem.prompt}</h1>

        <div
          ref={boardRef}
          className="relative mx-auto mt-8 grid max-w-md grid-cols-[minmax(0,1fr)_5rem] items-center gap-x-24 gap-y-5 px-3"
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
            {result && !result.correct && result.correctPairs.map((pair) => {
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
              const start = anchorFor(imageRefs.current.get(dragLine.imageId), "right");
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

          {problem.images.map((image, index) => {
            const answer = problem.answers[index];
            if (!answer) return null;

            return (
              <Fragment key={image.id}>
                <button
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
                    const point = pointWithinBoard(event.clientX, event.clientY);
                    setActiveImageId(image.id);
                    setDragLine({ imageId: image.id, pointerId: event.pointerId, ...point });
                  }}
                  onPointerMove={(event) => {
                    if (dragLine?.pointerId !== event.pointerId) return;
                    setDragLine({ ...dragLine, ...pointWithinBoard(event.clientX, event.clientY) });
                  }}
                  onPointerUp={(event) => finishDrag(event.clientX, event.clientY)}
                  onPointerCancel={() => setDragLine(null)}
                  onDragStart={(event) => event.preventDefault()}
                  className={`relative z-20 grid h-24 w-32 touch-none place-items-center justify-self-start rounded-2xl border-4 bg-white p-2 shadow-[0_5px_0_#d1d1d1] transition ${
                    activeImageId === image.id ? "border-orange-1" : "border-gray-2"
                  }`}
                >
                  {image.visual.kind === "image" ? (
                    <img
                      src={image.visual.src}
                      alt=""
                      draggable={false}
                      className="pointer-events-none size-20 select-none object-contain"
                    />
                  ) : (
                    <span className="text-display" aria-hidden="true">{image.visual.value}</span>
                  )}
                </button>

                <button
                  ref={(element) => {
                    if (element) answerRefs.current.set(answer.id, element);
                    else answerRefs.current.delete(answer.id);
                  }}
                  type="button"
                  disabled={disabled || !activeImageId}
                  data-answer-id={answer.id}
                  onClick={() => selectAnswer(answer.id)}
                  className="relative z-20 grid size-20 place-items-center rounded-2xl border-4 border-gray-2 bg-white text-heading shadow-[0_5px_0_#d1d1d1] enabled:border-blue-3 enabled:active:translate-y-1 disabled:cursor-default"
                  aria-label={`Pasangkan dengan ${answer.label}`}
                >
                  {answer.label}
                </button>
              </Fragment>
            );
          })}
        </div>
      </main>

      {grade ? (
        <ProblemFeedback
          grade={grade}
          isLastProblem
          isSubmitting={false}
          onContinue={continueAfterFeedback}
          showCorrectAnswer={false}
        />
      ) : (
        <LevelFooter
          canCheck={pairs.length === problem.images.length}
          isChecking={validationFetcher.state !== "idle"}
          onCheck={checkAnswer}
        />
      )}
    </div>
  );
}
