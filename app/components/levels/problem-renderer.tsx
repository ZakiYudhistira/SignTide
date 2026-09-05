import type { ReactNode } from "react";

import type { LevelProblem, ProblemGrade } from "~/models/level";

import { ImageMultipleProblem } from "./image-multiple-problem";
import { ImagePromptMultipleChoiceProblem } from "./image-prompt-multiple-choice-problem";
import { MultipleChoiceProblem } from "./multiple-choice-problem";
import { LineMatchProblemRenderer } from "./line-match-problem-renderer";
import { SignToWordOrderProblemView } from "./sign-to-word-order-problem";

type ProblemRendererProps = {
  problem: LevelProblem;
  selectedChoiceId: string | null;
  onSelectChoice: (choiceId: string) => void;
  grade: ProblemGrade | null;
  disabled: boolean;
};

type RuntimeProblemRenderer = (props: ProblemRendererProps) => ReactNode;

const problemRenderers = {
  "image-multiple": ({ problem, ...props }) =>
    problem.type === "image-multiple"
      ? <ImageMultipleProblem problem={problem} {...props} />
      : null,
  "multiple-choice": ({ problem, ...props }) =>
    problem.type === "multiple-choice"
      ? <MultipleChoiceProblem problem={problem} {...props} />
      : null,
  "image-prompt-multiple-choice": ({ problem, ...props }) =>
    problem.type === "image-prompt-multiple-choice"
      ? <ImagePromptMultipleChoiceProblem problem={problem} {...props} />
      : null,
  "sign-to-word-order": ({ problem, ...props }) =>
    problem.type === "sign-to-word-order"
      ? <SignToWordOrderProblemView problem={problem} {...props} />
      : null,
  "line-match": ({ problem, ...props }) =>
    problem.type === "line-match"
      ? <LineMatchProblemRenderer problem={problem} {...props} />
      : null,
} satisfies Record<LevelProblem["type"], RuntimeProblemRenderer>;

export function ProblemRenderer(props: ProblemRendererProps) {
  return problemRenderers[props.problem.type](props);
}
