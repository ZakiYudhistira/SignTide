import {
  defineProblems,
  imageMultipleProblem,
  imagePromptProblem,
} from "./problem-helpers.server";

const levelId = "section-1-lvl-6";

export const level6Problems = defineProblems([
  imagePromptProblem(levelId, 1, "a", "Isyarat apa yang ditunjukkan?", ["a", "z", "i", "f"], "a"),
  imageMultipleProblem(levelId, 2, "Pilih gambar yang menunjukkan huruf L.", ["f", "l", "w", "h"], "l"),
  imagePromptProblem(levelId, 3, "x", "Isyarat apakah yang ditunjukkan?", ["m", "x", "q", "p"], "x"),
  imageMultipleProblem(levelId, 4, "Pilih gambar untuk huruf M.", ["y", "q", "a", "m"], "m"),
  imagePromptProblem(levelId, 5, "c", "Isyarat apakah yang ditunjukkan?", ["a", "b", "c", "d"], "c"),
  imageMultipleProblem(levelId, 6, "Pilih gambar untuk huruf S.", ["g", "n", "s"], "s"),
  imagePromptProblem(levelId, 7, "w", "Huruf apakah yang ditunjukkan?", ["o", "p", "w", "j"], "w"),
  imagePromptProblem(levelId, 8, "f", "Isyarat apakah yang ditunjukkan?", ["b", "c", "f", "e"], "f"),
  imageMultipleProblem(levelId, 9, "Pilih gambar untuk huruf K.", ["b", "p", "k", "a"], "k"),
  imagePromptProblem(levelId, 10, "e", "Isyarat apakah yang ditunjukkan?", ["a", "c", "d", "e"], "e"),
  imageMultipleProblem(levelId, 11, "Pilih gambar untuk huruf E.", ["b", "e", "d", "a"], "e"),
  imageMultipleProblem(levelId, 12, "Manakah gambar yang menunjukkan U?", ["p", "k", "u", "w"], "u"),
  imagePromptProblem(levelId, 13, "a", "Huruf apakah yang ditunjukkan?", ["a", "b", "d", "e"], "a"),
  imagePromptProblem(levelId, 14, "b", "Huruf apakah yang ditunjukkan?", ["b", "a", "e", "d"], "b"),
  imagePromptProblem(levelId, 15, "c", "Huruf apakah yang ditunjukkan?", ["a", "b", "d", "c"], "c"),
]);
