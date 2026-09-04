import type {
  ImageMultipleProblem,
  ImagePromptMultipleChoiceProblem,
  LevelDefinition,
  MultipleChoiceProblem,
  RewardItemName,
} from "~/models/level";

import { section1LevelCatalog } from "./section-1/section-1-catalog.server";
import { section2LevelCatalog } from "./section-2/section-2-catalog.server";
import { section3LevelCatalog } from "./section-3/section-3-catalog.server";
import { section4LevelCatalog } from "./section-4/section-4-catalog.server";
import { section5LevelCatalog } from "./section-5/section-5-catalog.server";

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
  ...section2LevelCatalog,
  ...section3LevelCatalog,
  ...section4LevelCatalog,
  ...section5LevelCatalog,
} satisfies Record<string, ScoredLevelDefinition>;

export type LevelIdentifier = keyof typeof levelCatalog;
