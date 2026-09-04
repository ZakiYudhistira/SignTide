import {
  defineProblems,
  imageMultipleProblem,
  imagePromptProblem,
} from "./problem-helpers.server";

const levelId = "section-1-lvl-1";

export const level1Problems = defineProblems([
  imagePromptProblem(levelId, 1, "a", "Isyarat apa yang ditunjukkan?", ["a", "b", "c", "e"], "a"),
  imageMultipleProblem(levelId, 2, "Pilih gambar yang menunjukkan huruf A.", ["c", "a", "d", "b"], "a"),
  imagePromptProblem(levelId, 3, "b", "Isyarat apakah yang ditunjukkan?", ["a", "b", "c", "e"], "b"),
  imageMultipleProblem(levelId, 4, "Pilih gambar untuk huruf B.", ["c", "a", "d", "b"], "b"),
  imagePromptProblem(levelId, 5, "c", "Isyarat apakah yang ditunjukkan?", ["a", "b", "c", "d"], "c"),
  imageMultipleProblem(levelId, 6, "Pilih gambar untuk huruf C.", ["b", "a", "c"], "c"),
  imagePromptProblem(levelId, 7, "a", "Isyarat apakah yang ditunjukkan?", ["a", "b", "c", "e"], "a"),
  imagePromptProblem(levelId, 8, "d", "Isyarat apakah yang ditunjukkan?", ["b", "c", "d", "e"], "d"),
  imageMultipleProblem(levelId, 9, "Pilih gambar untuk huruf D.", ["b", "a", "d", "c"], "d"),
  imagePromptProblem(levelId, 10, "e", "Isyarat apakah yang ditunjukkan?", ["a", "c", "d", "e"], "e"),
  imageMultipleProblem(levelId, 11, "Pilih gambar untuk huruf E.", ["b", "e", "d", "a"], "e"),
  imageMultipleProblem(levelId, 12, "Manakah gambar yang menunjukkan C?", ["b", "e", "c", "a"], "c"),
  imagePromptProblem(levelId, 13, "a", "Huruf apakah yang ditunjukkan?", ["a", "b", "d", "e"], "a"),
  imagePromptProblem(levelId, 14, "b", "Huruf apakah yang ditunjukkan?", ["b", "a", "e", "d"], "b"),
  imagePromptProblem(levelId, 15, "c", "Huruf apakah yang ditunjukkan?", ["a", "b", "d", "c"], "c"),
]);
