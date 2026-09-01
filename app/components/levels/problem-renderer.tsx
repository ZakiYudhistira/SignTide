import type { ComponentType } from "react";

import type { LevelProblem } from "~/models/level";

import { ImageMultipleProblem } from "./image-multiple-problem";

type ProblemRendererProps = {
  problem: LevelProblem;
  selectedChoiceId: string | null;
  onSelectChoice: (choiceId: string) => void;
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
} satisfies ProblemRendererRegistry;

export function ProblemRenderer({ problem, selectedChoiceId, onSelectChoice }: ProblemRendererProps) {
  const Renderer = problemRenderers[problem.type];

  return (
    <Renderer
      problem={problem}
      selectedChoiceId={selectedChoiceId}
      onSelectChoice={onSelectChoice}
    />
  );
}
