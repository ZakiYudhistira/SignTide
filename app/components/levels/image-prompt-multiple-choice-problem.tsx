import type {
  ImagePromptMultipleChoiceProblem as ImagePromptMultipleChoiceProblemData,
  ProblemGrade,
} from "~/models/level";

import { ChoiceVisual } from "./choice-visual";

type ImagePromptMultipleChoiceProblemProps = {
  problem: ImagePromptMultipleChoiceProblemData;
  selectedChoiceId: string | null;
  onSelectChoice: (choiceId: string) => void;
  grade: ProblemGrade | null;
  disabled: boolean;
};

export function ImagePromptMultipleChoiceProblem({
  problem,
  selectedChoiceId,
  onSelectChoice,
  grade,
  disabled,
}: ImagePromptMultipleChoiceProblemProps) {
  return (
    <section aria-labelledby={`${problem.id}-prompt`}>
      {problem.eyebrow && (
        <p className="mt-3 text-title font-bold tracking-wide text-pink-2">
          {problem.eyebrow}
        </p>
      )}

      <h1 id={`${problem.id}-prompt`} className="mt-6 text-heading text-navy-1">
        {problem.prompt}
      </h1>

      <div className="mx-auto mt-8 flex aspect-[0.9] w-full max-w-72 items-center justify-center rounded-[1.75rem] border-[5px] border-orange-2 bg-white p-8 shadow-[0_7px_0_#ff9400]">
        <ChoiceVisual visual={problem.promptVisual} />
      </div>

      <div className="mx-auto mt-8 grid w-full max-w-md grid-cols-2 gap-4">
        {problem.choices.map((choice) => {
          const isSelected = selectedChoiceId === choice.id;
          const isCorrect = grade?.correctChoiceId === choice.id;
          const isIncorrectSelection = Boolean(grade && isSelected && !grade.isCorrect);
          const stateClass = isCorrect
            ? "border-green-2 bg-green-3 text-green-1 shadow-[0_5px_0_#7ac70c]"
            : isIncorrectSelection
              ? "border-red-2 bg-red-3 text-red-1 shadow-[0_5px_0_#d33131]"
              : isSelected
                ? "border-ocean bg-light-blue text-ocean shadow-[0_5px_0_#1d87cb]"
                : "border-biru-2 bg-white text-biru-2 shadow-[0_5px_0_#3a97d3] hover:bg-light-blue";

          return (
            <button
              key={choice.id}
              type="button"
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => onSelectChoice(choice.id)}
              className={`min-h-16 rounded-2xl border-3 px-3 py-3 text-title transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean disabled:cursor-default ${stateClass}`}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
