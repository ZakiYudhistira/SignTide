import type {
  ImageMultipleProblem,
  ImagePromptMultipleChoiceProblem,
  LineMatchPair,
  LineMatchProblem,
  LevelDefinition,
  MultipleChoiceProblem,
  RewardItemName,
  SignToWordOrderProblem,
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

export type ScoredSignToWordOrderProblem = SignToWordOrderProblem & {
  answer: [string, ...string[]];
};

export type ScoredLineMatchProblem = LineMatchProblem & {
  answer: LineMatchPair[];
};

export type ScoredLevelProblem =
  | ScoredImageMultipleProblem
  | ScoredMultipleChoiceProblem
  | ScoredImagePromptMultipleChoiceProblem
  | ScoredSignToWordOrderProblem
  | ScoredLineMatchProblem;

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

function invalidProblem(levelId: string, problemId: string, reason: string): never {
  throw new Error(`Invalid problem ${problemId} in ${levelId}: ${reason}`);
}

function assertUniqueIds(
  levelId: string,
  problemId: string,
  kind: string,
  ids: readonly string[],
) {
  if (new Set(ids).size !== ids.length) {
    invalidProblem(levelId, problemId, `${kind} IDs must be unique`);
  }
}

function assertValidAdvancedProblem(
  levelId: string,
  problem: ScoredLevelProblem,
) {
  if (problem.type === "sign-to-word-order") {
    if (problem.answer.length !== problem.wordChoices.length) {
      invalidProblem(
        levelId,
        problem.id,
        "answer and wordChoices must contain the same number of words",
      );
    }

    const remainingChoices = [...problem.wordChoices];
    for (const word of problem.answer) {
      const index = remainingChoices.indexOf(word);
      if (index < 0) {
        invalidProblem(
          levelId,
          problem.id,
          `answer word ${JSON.stringify(word)} is missing from wordChoices`,
        );
      }
      remainingChoices.splice(index, 1);
    }
    return;
  }

  if (problem.type !== "line-match") return;

  if (problem.images.length === 0 || problem.answers.length === 0) {
    invalidProblem(levelId, problem.id, "images and answers cannot be empty");
  }
  if (problem.images.length !== problem.answers.length) {
    invalidProblem(
      levelId,
      problem.id,
      "images and answers must contain the same number of entries",
    );
  }
  if (problem.answer.length !== problem.images.length) {
    invalidProblem(
      levelId,
      problem.id,
      "answer must contain exactly one pair for every image",
    );
  }

  const imageIds = problem.images.map((image) => image.id);
  const answerIds = problem.answers.map((answer) => answer.id);
  const pairedImageIds = problem.answer.map((pair) => pair.imageId);
  const pairedAnswerIds = problem.answer.map((pair) => pair.answerId);

  assertUniqueIds(levelId, problem.id, "image", imageIds);
  assertUniqueIds(levelId, problem.id, "answer", answerIds);
  assertUniqueIds(levelId, problem.id, "paired image", pairedImageIds);
  assertUniqueIds(levelId, problem.id, "paired answer", pairedAnswerIds);

  const knownImageIds = new Set(imageIds);
  const knownAnswerIds = new Set(answerIds);
  for (const pair of problem.answer) {
    if (!knownImageIds.has(pair.imageId)) {
      invalidProblem(
        levelId,
        problem.id,
        `unknown image ID ${JSON.stringify(pair.imageId)} in answer`,
      );
    }
    if (!knownAnswerIds.has(pair.answerId)) {
      invalidProblem(
        levelId,
        problem.id,
        `unknown answer ID ${JSON.stringify(pair.answerId)} in answer`,
      );
    }
  }
}

for (const [levelId, level] of Object.entries(levelCatalog)) {
  assertUniqueIds(
    levelId,
    levelId,
    "problem",
    level.problems.map((problem) => problem.id),
  );
  level.problems.forEach((problem) =>
    assertValidAdvancedProblem(levelId, problem),
  );
}

export type LevelIdentifier = keyof typeof levelCatalog;
