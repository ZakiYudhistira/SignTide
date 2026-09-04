import { Check, X } from "lucide-react";

import type { ProblemGrade } from "~/models/level";

type ProblemFeedbackProps = {
  grade: ProblemGrade;
  isLastProblem: boolean;
  isSubmitting: boolean;
  onContinue: () => void;
  showCorrectAnswer?: boolean;
};

export function ProblemFeedback({ grade, isLastProblem, isSubmitting, onContinue, showCorrectAnswer = true }: ProblemFeedbackProps) {
  const Icon = grade.isCorrect ? Check : X;

  return (
    <footer
      aria-live="polite"
      className={`absolute inset-x-0 bottom-0 z-50 px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6 ${
        grade.isCorrect ? "bg-green-3 text-green-1" : "bg-red-3 text-red-1"
      }`}
    >
      <div className="mx-auto flex max-w-md items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white">
          <Icon className="size-8 stroke-[4]" aria-hidden="true" />
        </span>
        <div>
          <p className="text-title">
            {grade.isCorrect ? "Benar! Good Job" : "Solusi Yang Benar:"}
          </p>
          {!grade.isCorrect && showCorrectAnswer && (
            <p className="mt-1 text-body-large">{grade.correctAnswerLabel}</p>
          )}
        </div>
      </div>

      <button
        type="button"
        disabled={isSubmitting}
        onClick={onContinue}
        className={`mx-auto mt-7 block h-16 w-full max-w-md rounded-3xl text-button text-white shadow-[0_7px_0] transition active:translate-y-1 active:shadow-[0_3px_0] disabled:cursor-wait disabled:opacity-70 ${
          grade.isCorrect ? "bg-green-2 shadow-green-1" : "bg-red-2 shadow-red-1"
        }`}
      >
        {isSubmitting && isLastProblem ? "Menyelesaikan..." : "Lanjutkan"}
      </button>
    </footer>
  );
}
