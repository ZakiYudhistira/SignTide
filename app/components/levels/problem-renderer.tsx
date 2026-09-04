import type { ComponentType } from "react";

import type { LevelProblem, ProblemGrade } from "~/models/level";

import { ImageMultipleProblem } from "./image-multiple-problem";
import { ImagePromptMultipleChoiceProblem } from "./image-prompt-multiple-choice-problem";
import { MultipleChoiceProblem } from "./multiple-choice-problem";

type ProblemRendererProps = {
  problem: LevelProblem;
  selectedChoiceId: string | null;
  onSelectChoice: (choiceId: string) => void;
  grade: ProblemGrade | null;
  disabled: boolean;
};

type SharedRendererProps = Omit<ProblemRendererProps, "problem">;

type ProblemRendererRegistry = {
  [Type in LevelProblem["type"]]: ComponentType<
    SharedRendererProps & {
      problem: Extract<LevelProblem, { type: Type }>;
    }
  >;
};

const problemRenderers = {
  "image-multiple": ImageMultipleProblem,
  "multiple-choice": MultipleChoiceProblem,
  "image-prompt-multiple-choice": ImagePromptMultipleChoiceProblem,
} satisfies ProblemRendererRegistry;

export function ProblemRenderer({ problem, selectedChoiceId, onSelectChoice, grade, disabled }: ProblemRendererProps) {
  const sharedProps = { selectedChoiceId, onSelectChoice, grade, disabled };

  switch (problem.type) {
    case "image-multiple":
      return <ImageMultipleProblem problem={problem} {...sharedProps} />;
    case "multiple-choice":
      return <MultipleChoiceProblem problem={problem} {...sharedProps} />;
    case "image-prompt-multiple-choice":
      return <ImagePromptMultipleChoiceProblem problem={problem} {...sharedProps} />;
  }
}
