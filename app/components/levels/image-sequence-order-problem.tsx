import { useMemo, useRef, useState } from "react";
import { motion, Reorder } from "motion/react";
import { useFetcher, useNavigate } from "react-router";

import type { SignToWordOrderProblem } from "~/models/level";

import { LevelFooter } from "./level-footer";
import { LevelHeader } from "./level-header";
import { ProblemFeedback } from "./problem-feedback";

type ImageSequenceOrderProblemProps = {
  problem: SignToWordOrderProblem;
};

type WordChoice = {
  id: string;
  label: string;
};

type SequenceValidationResult = {
  correct: boolean;
  correctAnswer: string;
};

function SequenceToken({
  word,
  onPlace,
  dropZone,
}: {
  word: WordChoice;
  onPlace: () => void;
  dropZone: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <motion.button
      type="button"
      drag
      dragSnapToOrigin
      dragElastic={0.16}
      whileDrag={{ scale: 1.08, zIndex: 30 }}
      whileTap={{ scale: 0.97 }}
      onClick={onPlace}
      onDragEnd={(_, info) => {
        const bounds = dropZone.current?.getBoundingClientRect();
        if (!bounds) return;

        const x = info.point.x - window.scrollX;
        const y = info.point.y - window.scrollY;
        if (x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom) {
          onPlace();
        }
      }}
      className="flex w-28 touch-none flex-col items-center rounded-2xl border-2 border-blue-3 bg-white p-2 shadow-[0_5px_0_#3a97d3]"
      aria-label={`Letakkan kata ${word.label} ke kotak jawaban`}
    >
      <span className="px-2 py-3 text-body-large font-bold text-navy-1">{word.label}</span>
    </motion.button>
  );
}

export function ImageSequenceOrderProblemView({ problem }: ImageSequenceOrderProblemProps) {
  const navigate = useNavigate();
  const validationFetcher = useFetcher<SequenceValidationResult>();
  const dropZone = useRef<HTMLDivElement>(null);
  const choices = useMemo(
    () => problem.wordChoices.map((label, index) => ({ id: `${index}-${label}`, label })),
    [problem.wordChoices],
  );
  const [answer, setAnswer] = useState<WordChoice[]>([]);
  const available = useMemo(
    () => choices.filter((word) => !answer.some((item) => item.id === word.id)),
    [answer, choices],
  );

  const placeWord = (word: WordChoice) => {
    setAnswer((current) => current.some((item) => item.id === word.id) ? current : [...current, word]);
  };

  const checkAnswer = () => {
    validationFetcher.submit(
      { answer: JSON.stringify(answer.map((word) => word.label)) },
      { method: "post" },
    );
  };

  const isChecking = validationFetcher.state !== "idle";
  const result = validationFetcher.data;
  const grade = result
    ? {
        problemId: problem.id,
        selectedChoiceId: answer.map((word) => word.label).join(" "),
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

    setAnswer([]);
    validationFetcher.reset();
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-background text-navy-1">
      <LevelHeader progress={100} lives={5} onExit={() => navigate("/level")} />

      <main className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-5 pb-[calc(12rem+env(safe-area-inset-bottom))] [-webkit-overflow-scrolling:touch]">
        <p className="mt-3 text-title font-bold tracking-wide text-pink-2">{problem.eyebrow}</p>
        <h1 className="mt-6 text-heading">{problem.prompt}</h1>

      <div className="mt-6 flex items-end gap-2">
        <img src={problem.mascot.image} alt={problem.mascot.alt} className="h-32 w-28 shrink-0 object-contain" />
        <div className="relative mb-3 flex min-h-32 min-w-0 flex-1 items-center justify-center gap-2 rounded-3xl border-2 border-blue-3 bg-white px-3 py-3 shadow-sm before:absolute before:-left-3 before:bottom-5 before:size-5 before:rotate-45 before:border-b-2 before:border-l-2 before:border-blue-3 before:bg-white">
          {problem.imageOrder.map((sign, index) =>
            sign.kind === "image" ? (
              <img key={`${sign.src}-${index}`} src={sign.src} alt={sign.alt} className="min-w-0 flex-1 object-contain" />
            ) : (
              <span key={`${sign.value}-${index}`} className="text-display" aria-label={sign.alt}>{sign.value}</span>
            ),
          )}
        </div>
      </div>

      <section aria-labelledby="answer-heading" className="mt-5">
        <h2 id="answer-heading" className="text-body-large font-bold">Terjemahanmu</h2>
        <div ref={dropZone} className="mt-3 min-h-32 rounded-3xl border-4 border-dashed border-gray-2 bg-white p-4">
          {answer.length === 0 ? (
            <p className="grid min-h-28 place-items-center text-center text-body text-navy-3">Letakkan kata di sini</p>
          ) : (
            <Reorder.Group axis="x" values={answer} onReorder={(words) => !grade && setAnswer(words)} className="flex min-h-24 items-center justify-center gap-3">
              {answer.map((word) => (
                <Reorder.Item key={word.id} value={word} className="cursor-grab touch-none active:cursor-grabbing">
                  <button type="button" disabled={Boolean(grade)} onClick={() => setAnswer((current) => current.filter((item) => item.id !== word.id))} className="rounded-2xl border-3 border-ocean bg-light-blue px-5 py-3 text-body-large font-bold text-ocean shadow-[0_5px_0_#1d87cb] disabled:cursor-default" aria-label={`Keluarkan kata ${word.label} dari jawaban`}>
                    {word.label}
                  </button>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
        </div>
      </section>

      <section aria-labelledby="choices-heading" className="mt-7">
        <h2 id="choices-heading" className="text-body-large font-bold">Pilihan kata</h2>
        <div className="mt-4 flex min-h-32 flex-wrap justify-center gap-4">
          {available.map((word) => (
            <SequenceToken key={word.id} word={word} onPlace={() => placeWord(word)} dropZone={dropZone} />
          ))}
        </div>
      </section>
      </main>

      {grade ? (
        <ProblemFeedback
          grade={grade}
          isLastProblem
          isSubmitting={false}
          onContinue={continueAfterFeedback}
        />
      ) : (
        <LevelFooter
          canCheck={answer.length === problem.wordChoices.length}
          isChecking={isChecking}
          onCheck={checkAnswer}
        />
      )}
    </div>
  );
}
