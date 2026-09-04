import {
  levelCatalog,
  type LevelIdentifier,
  type ScoredLevelProblem,
} from "~/data/levels/level-catalog.server";
import type {
  LevelDefinition,
  LevelProblem,
  LevelResult,
  ProblemGrade,
} from "~/models/level";

export type SubmittedAnswers = Record<string, string>;

function isLevelIdentifier(identifier: string): identifier is LevelIdentifier {
  return identifier in levelCatalog;
}

function removeAnswerKey(problem: ScoredLevelProblem): LevelProblem {
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

export function getLevelRewardName(identifier: string) {
  if (!isLevelIdentifier(identifier)) return null;
  const level = levelCatalog[identifier];
  return "reward" in level ? level.reward.name : null;
}

export function validateLevelAnswers(
  identifier: string,
  submittedAnswers: SubmittedAnswers,
): LevelResult | null {
  if (!isLevelIdentifier(identifier)) return null;

  const problems: readonly ScoredLevelProblem[] = levelCatalog[identifier].problems;
  const score = problems.reduce<number>(
    (total, problem) =>
      total + (submittedAnswers[problem.id] === problem.correctChoiceId ? 1 : 0),
    0,
  );

  return { score, total: problems.length };
}

export function gradeLevelProblem(
  identifier: string,
  problemId: string,
  selectedChoiceId: string,
): ProblemGrade | null {
  if (!isLevelIdentifier(identifier)) return null;

  const problem = levelCatalog[identifier].problems.find(
    (candidate) => candidate.id === problemId,
  );

  if (!problem || !problem.choices.some((choice) => choice.id === selectedChoiceId)) {
    return null;
  }

  const correctChoice = problem.choices.find(
    (choice) => choice.id === problem.correctChoiceId,
  );

  return {
    problemId,
    selectedChoiceId,
    correctChoiceId: problem.correctChoiceId,
    correctAnswerLabel:
      correctChoice?.label.trim() || problem.correctChoiceId.toUpperCase(),
    isCorrect: selectedChoiceId === problem.correctChoiceId,
  };
}
