import type { SignToWordOrderProblem } from "~/models/level";
import { learningAssetUrl } from "~/utils/learning-asset.server";

type ScoredSignToWordOrderProblem = SignToWordOrderProblem & {
  answer: [string, ...string[]];
};

const debugSequenceProblem: ScoredSignToWordOrderProblem = {
  id: "debug-aku-tidak-paham",
  type: "sign-to-word-order",
  eyebrow: "SUSUN KALIMAT",
  prompt: "Susun isyarat berikut menjadi terjemahan yang benar!",
  mascot: {
    image: "/signtide_character.png",
    alt: "Maskot SignTide memberi petunjuk",
  },
  imageOrder: [
    {
      kind: "image",
      src: learningAssetUrl("kata/Aku.png"),
      alt: "Isyarat untuk kata Aku",
    },
    {
      kind: "image",
      src: learningAssetUrl("kata/TidakPaham.png"),
      alt: "Isyarat untuk kata Tidak Paham",
    },
  ],
  wordChoices: ["Paham", "Aku", "Tidak"],
  answer: ["Aku", "Tidak", "Paham"],
};

export function getDebugSequenceProblem(): SignToWordOrderProblem {
  const { answer: _answer, ...publicProblem } = debugSequenceProblem;
  return publicProblem;
}

export function validateDebugSequenceAnswer(submittedAnswer: readonly string[]) {
  return {
    correct:
      submittedAnswer.length === debugSequenceProblem.answer.length &&
      submittedAnswer.every(
        (word, index) => word === debugSequenceProblem.answer[index],
      ),
    correctAnswer: debugSequenceProblem.answer.join(" "),
  };
}
