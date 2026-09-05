import type { ScoredMultipleChoiceProblem } from "./level-catalog.server";

export function placeholderProblems(levelId: string): [ScoredMultipleChoiceProblem] {
  return [{
    id: `${levelId}-problem-1`,
    type: "multiple-choice",
    prompt: "Pilih jawaban placeholder yang benar.",
    choices: [
      { id: "jawaban-benar", label: "Jawaban Benar" },
      { id: "pilihan-dua", label: "Pilihan Dua" },
      { id: "pilihan-tiga", label: "Pilihan Tiga" },
      { id: "pilihan-empat", label: "Pilihan Empat" },
    ],
    correctChoiceId: "jawaban-benar",
  }];
}
