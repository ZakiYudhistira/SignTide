import { useMemo, useRef, useState } from "react";
import { motion, Reorder } from "motion/react";

import type { ProblemGrade, SignToWordOrderProblem } from "~/models/level";

type Props = {
  problem: SignToWordOrderProblem;
  selectedChoiceId: string | null;
  onSelectChoice: (choiceId: string) => void;
  grade: ProblemGrade | null;
  disabled: boolean;
};

type Word = { id: string; label: string };

export function SignToWordOrderProblemView({
  problem,
  selectedChoiceId,
  onSelectChoice,
  grade,
  disabled,
}: Props) {
  const dropZone = useRef<HTMLDivElement>(null);
  const choices = useMemo(
    () => problem.wordChoices.map((label, index) => ({ id: `${index}-${label}`, label })),
    [problem.wordChoices],
  );
  const [answer, setAnswer] = useState<Word[]>(() => {
    if (!selectedChoiceId) return [];
    try {
      const parsed: unknown = JSON.parse(selectedChoiceId);
      if (!Array.isArray(parsed)) return [];

      const unusedChoices = [...choices];
      return parsed.flatMap((label) => {
        const choiceIndex = unusedChoices.findIndex(
          (item) => item.label === label,
        );
        if (choiceIndex < 0) return [];

        return unusedChoices.splice(choiceIndex, 1);
      });
    } catch {
      return [];
    }
  });
  const available = choices.filter((word) => !answer.some((item) => item.id === word.id));

  const updateAnswer = (next: Word[]) => {
    if (disabled) return;
    setAnswer(next);
    onSelectChoice(JSON.stringify(next.map((word) => word.label)));
  };

  const placeWord = (word: Word) => {
    if (disabled || answer.some((item) => item.id === word.id)) return;
    updateAnswer([...answer, word]);
  };

  return (
    <div>
      {problem.eyebrow && <p className="mt-3 text-title font-bold text-pink-2">{problem.eyebrow}</p>}
      <h1 className="mt-6 text-heading">{problem.prompt}</h1>

      <div className="mt-6 flex items-end gap-2">
        <img src={problem.mascot.image} alt={problem.mascot.alt} className="h-32 w-28 shrink-0 object-contain" />
        <div className="relative mb-3 flex min-h-32 min-w-0 flex-1 items-center justify-center gap-2 rounded-3xl border-2 border-blue-3 bg-white px-3 py-3 shadow-sm">
          {problem.imageOrder.map((sign, index) => sign.kind === "image" ? (
            <img key={`${sign.src}-${index}`} src={sign.src} alt={sign.alt} className="min-w-0 flex-1 object-contain" />
          ) : (
            <span key={`${sign.value}-${index}`} className="text-display" aria-label={sign.alt}>{sign.value}</span>
          ))}
        </div>
      </div>

      <section className="mt-5" aria-labelledby={`${problem.id}-answer-heading`}>
        <h2 id={`${problem.id}-answer-heading`} className="text-body-large font-bold">Terjemahanmu</h2>
        <div ref={dropZone} className="mt-3 min-h-32 rounded-3xl border-4 border-dashed border-gray-2 bg-white p-4">
          {answer.length === 0 ? (
            <p className="grid min-h-28 place-items-center text-center text-body text-navy-3">Letakkan kata di sini</p>
          ) : (
            <Reorder.Group axis="x" values={answer} onReorder={updateAnswer} className="flex min-h-24 items-center justify-start gap-3 overflow-x-auto py-2">
              {answer.map((word) => (
                <Reorder.Item key={word.id} value={word} dragListener={!disabled} className="shrink-0 cursor-grab touch-none active:cursor-grabbing">
                  <button type="button" disabled={disabled} onClick={() => updateAnswer(answer.filter((item) => item.id !== word.id))} className="rounded-2xl border-3 border-ocean bg-light-blue px-5 py-3 text-body-large font-bold text-ocean shadow-[0_5px_0_#1d87cb]">
                    {word.label}
                  </button>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
        </div>
      </section>

      <section className="mt-7" aria-labelledby={`${problem.id}-choices-heading`}>
        <h2 id={`${problem.id}-choices-heading`} className="text-body-large font-bold">Pilihan kata</h2>
        <div className="mt-4 flex min-h-32 flex-wrap justify-center gap-4">
          {available.map((word) => (
            <motion.button key={word.id} type="button" drag dragSnapToOrigin dragElastic={0.16} whileTap={{ scale: 0.97 }} onClick={() => placeWord(word)} onDragEnd={(_, info) => {
              const bounds = dropZone.current?.getBoundingClientRect();
              const viewportX = info.point.x - window.scrollX;
              const viewportY = info.point.y - window.scrollY;
              if (bounds && viewportX >= bounds.left && viewportX <= bounds.right && viewportY >= bounds.top && viewportY <= bounds.bottom) placeWord(word);
            }} disabled={disabled} className="flex w-28 touch-none items-center justify-center rounded-2xl border-2 border-blue-3 bg-white p-2 shadow-[0_5px_0_#3a97d3]">
              <span className="px-2 py-3 text-body-large font-bold">{word.label}</span>
            </motion.button>
          ))}
        </div>
      </section>
      {grade && <p className="sr-only">{grade.isCorrect ? "Jawaban benar" : `Jawaban yang benar: ${grade.correctAnswerLabel}`}</p>}
    </div>
  );
}
