import type { ImageMultipleProblem as ImageMultipleProblemData, ProblemGrade } from "~/models/level";

import { ChoiceVisual } from "./choice-visual";

type ImageMultipleProblemProps = {
  problem: ImageMultipleProblemData;
  selectedChoiceId: string | null;
  onSelectChoice: (choiceId: string) => void;
  grade: ProblemGrade | null;
  disabled: boolean;
};

export function ImageMultipleProblem({ problem, selectedChoiceId, onSelectChoice, grade, disabled }: ImageMultipleProblemProps) {
  return (
    <section aria-labelledby={`${problem.id}-prompt`}>
      {problem.eyebrow && (
        <div className="mt-3 flex items-center gap-2 text-pink-2">
          <span className="text-3xl leading-none" aria-hidden="true">✦</span>
          <span className="text-title font-bold tracking-wide">{problem.eyebrow}</span>
        </div>
      )}

      <h1 id={`${problem.id}-prompt`} className="mt-6 text-heading text-navy-1">
        {problem.prompt}
      </h1>

      <div className="mt-8 grid grid-cols-2 gap-4">
        {problem.choices.map((choice, index) => {
          const isSelected = selectedChoiceId === choice.id;
          const isCorrect = grade?.correctChoiceId === choice.id;
          const isIncorrectSelection = Boolean(grade && isSelected && !grade.isCorrect);
          const stateClass = isCorrect
            ? "border-green-2 bg-green-3 shadow-[0_5px_0_#7ac70c]"
            : isIncorrectSelection
              ? "border-red-2 bg-red-3 shadow-[0_5px_0_#d33131]"
              : isSelected
                ? "border-ocean bg-light-blue shadow-[0_5px_0_#1d87cb]"
                : "border-gray-2 hover:border-blue-3 focus-visible:border-ocean focus-visible:outline-none";

          return (
            <button
              key={choice.id}
              type="button"
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => onSelectChoice(choice.id)}
              className={`relative flex aspect-[0.82] flex-col items-center justify-center rounded-[1.6rem] border-[5px] bg-white px-3 pb-10 pt-5 transition disabled:cursor-default ${stateClass}`}
            >
              <div className="flex min-h-28 w-full flex-1 items-center justify-center">
                <ChoiceVisual visual={choice.visual} />
              </div>
              <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-xl border-2 border-gray-1 text-xl font-semibold text-gray-1">
                {index + 1}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
