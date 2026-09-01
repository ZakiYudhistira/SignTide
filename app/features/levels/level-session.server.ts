import {
  levelCatalog,
  type LevelIdentifier,
  type ScoredImageMultipleProblem,
} from "~/data/levels/level-catalog.server";
import type {
  ImageMultipleProblem,
  LevelDefinition,
  LevelResult,
} from "~/models/level";

export type SubmittedAnswers = Record<string, string>;

function isLevelIdentifier(identifier: string): identifier is LevelIdentifier {
  return identifier in levelCatalog;
}

function removeAnswerKey(problem: ScoredImageMultipleProblem): ImageMultipleProblem {
  const { correctChoiceId: _correctChoiceId, ...publicProblem } = problem;
  return publicProblem;
}

export function getPublicLevelByIdentifier(identifier: string): LevelDefinition | null {
  if (!isLevelIdentifier(identifier)) return null;

  const level = levelCatalog[identifier];

  return {
    id: level.id,
    title: level.title,
    description: level.description,
    lives: level.lives,
    problems: level.problems.map(removeAnswerKey) as LevelDefinition["problems"],
  };
}

export function validateLevelAnswers(
  identifier: string,
  submittedAnswers: SubmittedAnswers,
): LevelResult | null {
  if (!isLevelIdentifier(identifier)) return null;

  const problems: readonly ScoredImageMultipleProblem[] =
    levelCatalog[identifier].problems;
  const score = problems.reduce<number>(
    (total, problem) =>
      total + (submittedAnswers[problem.id] === problem.correctChoiceId ? 1 : 0),
    0,
  );

  return { score, total: problems.length };
}
