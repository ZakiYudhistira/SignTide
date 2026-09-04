import type {
  ImageMultipleProblem,
  ImagePromptMultipleChoiceProblem,
  LevelDefinition,
  MultipleChoiceProblem,
  RewardItemName,
} from "~/models/level";

import { section1LevelCatalog } from "./section-1/section-1-catalog.server";

export type ScoredImageMultipleProblem = ImageMultipleProblem & {
  correctChoiceId: string;
};

export type ScoredMultipleChoiceProblem = MultipleChoiceProblem & {
  correctChoiceId: string;
};

export type ScoredImagePromptMultipleChoiceProblem =
  ImagePromptMultipleChoiceProblem & {
    correctChoiceId: string;
  };

export type ScoredLevelProblem =
  | ScoredImageMultipleProblem
  | ScoredMultipleChoiceProblem
  | ScoredImagePromptMultipleChoiceProblem;

export type ScoredLevelDefinition = Omit<LevelDefinition, "problems"> & {
  problems: [ScoredLevelProblem, ...ScoredLevelProblem[]];
  reward?: { name: RewardItemName };
};

export function defineLevel<TProblems extends [ScoredLevelProblem, ...ScoredLevelProblem[]]>(
  level: Omit<LevelDefinition, "problems"> & { problems: TProblems },
) {
  return level;
}

export const levelCatalog = {
  ...section1LevelCatalog,
} satisfies Record<string, ScoredLevelDefinition>;

export type LevelIdentifier = keyof typeof levelCatalog;
