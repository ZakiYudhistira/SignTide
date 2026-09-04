import type { LineMatchPair, LineMatchProblem } from "~/models/level";
import { learningAssetUrl } from "~/utils/learning-asset.server";

type ScoredLineMatchProblem = LineMatchProblem & {
  answer: LineMatchPair[];
};

const letters = ["A", "B", "C", "D", "E"] as const;

const debugLineMatchProblem: ScoredLineMatchProblem = {
  id: "debug-alphabet-line-match",
  type: "line-match",
  prompt: "Tarik garis gambar dan pasangannya!",
  images: letters.map((letter) => ({
    id: `sign-${letter.toLowerCase()}`,
    visual: {
      kind: "image",
      src: learningAssetUrl(`alphabet/SIBI_${letter}.png`),
      alt: `Isyarat untuk huruf ${letter}`,
    },
  })),
  answers: ["C", "A", "E", "B", "D"].map((letter) => ({
    id: `letter-${letter.toLowerCase()}`,
    label: letter,
  })),
  answer: letters.map((letter) => ({
    imageId: `sign-${letter.toLowerCase()}`,
    answerId: `letter-${letter.toLowerCase()}`,
  })),
};

export function getDebugLineMatchProblem(): LineMatchProblem {
  const { answer: _answer, ...publicProblem } = debugLineMatchProblem;
  return publicProblem;
}

export function validateDebugLineMatchAnswer(submittedAnswer: readonly LineMatchPair[]) {
  const expectedByImage = new Map(
    debugLineMatchProblem.answer.map((pair) => [pair.imageId, pair.answerId]),
  );
  const submittedImageIds = new Set(submittedAnswer.map((pair) => pair.imageId));
  const submittedAnswerIds = new Set(submittedAnswer.map((pair) => pair.answerId));
  const hasUniquePairs =
    submittedImageIds.size === submittedAnswer.length &&
    submittedAnswerIds.size === submittedAnswer.length;
  const correct =
    hasUniquePairs &&
    submittedAnswer.length === debugLineMatchProblem.answer.length &&
    submittedAnswer.every(
      (pair) => expectedByImage.get(pair.imageId) === pair.answerId,
    );

  const answerLabels = new Map(
    debugLineMatchProblem.answers.map((answer) => [answer.id, answer.label]),
  );
  const imageLabels = new Map(
    debugLineMatchProblem.images.map((image) => [image.id, image.visual.alt]),
  );

  return {
    correct,
    correctPairs: debugLineMatchProblem.answer,
    correctAnswer: debugLineMatchProblem.answer
      .map((pair) =>
        `${imageLabels.get(pair.imageId) ?? pair.imageId} → ${answerLabels.get(pair.answerId) ?? pair.answerId}`,
      )
      .join(", "),
  };
}
