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
  if (problem.type === "sign-to-word-order" || problem.type === "line-match") {
    const { answer: _answer, ...publicProblem } = problem;
    return publicProblem;
  }

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
  const score = problems.reduce<number>((total, problem) => {
    const submittedAnswer = submittedAnswers[problem.id];
    const grade = submittedAnswer
      ? gradeLevelProblem(identifier, problem.id, submittedAnswer)
      : null;

    return total + (grade?.isCorrect ? 1 : 0);
  }, 0);

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

  if (!problem) return null;

  if (problem.type === "sign-to-word-order") {
    let submittedAnswer: unknown;
    try {
      submittedAnswer = JSON.parse(selectedChoiceId);
    } catch {
      return null;
    }

    if (
      !Array.isArray(submittedAnswer) ||
      !submittedAnswer.every((word) => typeof word === "string")
    ) {
      return null;
    }

    const correct =
      submittedAnswer.length === problem.answer.length &&
      submittedAnswer.every((word, index) => word === problem.answer[index]);
    const correctAnswer = problem.answer.join(" ");

    return {
      problemId,
      selectedChoiceId,
      correctChoiceId: JSON.stringify(problem.answer),
      correctAnswerLabel: correctAnswer,
      isCorrect: correct,
    };
  }

  if (problem.type === "line-match") {
    let submittedAnswer: unknown;
    try {
      submittedAnswer = JSON.parse(selectedChoiceId);
    } catch {
      return null;
    }

    if (
      !Array.isArray(submittedAnswer) ||
      !submittedAnswer.every(
        (pair) =>
          pair !== null &&
          typeof pair === "object" &&
          typeof (pair as Record<string, unknown>).imageId === "string" &&
          typeof (pair as Record<string, unknown>).answerId === "string",
      )
    ) {
      return null;
    }

    const expectedByImage = new Map(
      problem.answer.map((pair) => [pair.imageId, pair.answerId]),
    );
    const submittedPairs = submittedAnswer as Array<{ imageId: string; answerId: string }>;
    const uniqueImages = new Set(submittedPairs.map((pair) => pair.imageId));
    const uniqueAnswers = new Set(submittedPairs.map((pair) => pair.answerId));
    const correct =
      submittedPairs.length === problem.answer.length &&
      uniqueImages.size === submittedPairs.length &&
      uniqueAnswers.size === submittedPairs.length &&
      submittedPairs.every(
        (pair) => expectedByImage.get(pair.imageId) === pair.answerId,
      );

    return {
      problemId,
      selectedChoiceId,
      correctChoiceId: JSON.stringify(problem.answer),
      correctAnswerLabel: problem.answer
        .map((pair) => {
          const image = problem.images.find((item) => item.id === pair.imageId);
          const answer = problem.answers.find((item) => item.id === pair.answerId);
          return `${image?.visual.alt ?? pair.imageId} → ${answer?.label ?? pair.answerId}`;
        })
        .join(", "),
      isCorrect: correct,
    };
  }

  if (!problem.choices.some((choice) => choice.id === selectedChoiceId)) {
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
