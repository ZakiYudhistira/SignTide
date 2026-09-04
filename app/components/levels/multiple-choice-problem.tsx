import type { MultipleChoiceProblem as MultipleChoiceProblemData, ProblemGrade } from "~/models/level";

type MultipleChoiceProblemProps = {
  problem: MultipleChoiceProblemData;
  selectedChoiceId: string | null;
  onSelectChoice: (choiceId: string) => void;
  grade: ProblemGrade | null;
  disabled: boolean;
};

export function MultipleChoiceProblem({
  problem,
  selectedChoiceId,
  onSelectChoice,
  grade,
  disabled,
}: MultipleChoiceProblemProps) {
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

      <div className="mt-8 flex flex-col gap-4">
        {problem.choices.map((choice, index) => {
          const isSelected = selectedChoiceId === choice.id;
          const isCorrect = grade?.correctChoiceId === choice.id;
          const isIncorrectSelection = Boolean(grade && isSelected && !grade.isCorrect);
          const stateClass = isCorrect
            ? "border-green-2 bg-green-3 text-green-1 shadow-[0_5px_0_#7ac70c]"
            : isIncorrectSelection
              ? "border-red-2 bg-red-3 text-red-1 shadow-[0_5px_0_#d33131]"
              : isSelected
                ? "border-ocean bg-light-blue shadow-[0_5px_0_#1d87cb]"
                : "border-gray-2 bg-white hover:border-blue-3";

          return (
            <button
              key={choice.id}
              type="button"
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => onSelectChoice(choice.id)}
              className={`flex min-h-20 items-center gap-4 rounded-3xl border-4 px-5 py-4 text-left text-title transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean disabled:cursor-default ${stateClass}`}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border-2 border-current text-body-large">
                {index + 1}
              </span>
              <span>{choice.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
