import {
  defineProblems,
  imageMultipleProblem,
  imagePromptProblem,
} from "./problem-helpers.server";

const levelId = "section-1-lvl-3";

export const level3Problems = defineProblems([
  imagePromptProblem(levelId, 1, "k", "Isyarat apa yang ditunjukkan?", ["k", "l", "m", "o"], "k"),
  imageMultipleProblem(levelId, 2, "Pilih gambar yang menunjukkan huruf K.", ["m", "k", "n", "l"], "k"),
  imagePromptProblem(levelId, 3, "l", "Isyarat apakah yang ditunjukkan?", ["k", "l", "m", "o"], "l"),
  imageMultipleProblem(levelId, 4, "Pilih gambar untuk huruf L.", ["m", "k", "n", "l"], "l"),
  imagePromptProblem(levelId, 5, "m", "Isyarat apakah yang ditunjukkan?", ["k", "l", "m", "n"], "m"),
  imageMultipleProblem(levelId, 6, "Pilih gambar untuk huruf M.", ["l", "k", "m"], "m"),
  imagePromptProblem(levelId, 7, "m", "Huruf apakah yang ditunjukkan?", ["k", "l", "m", "o"], "m"),
  imagePromptProblem(levelId, 8, "n", "Isyarat apakah yang ditunjukkan?", ["l", "m", "n", "o"], "n"),
  imageMultipleProblem(levelId, 9, "Pilih gambar untuk huruf N.", ["l", "k", "n", "m"], "n"),
  imagePromptProblem(levelId, 10, "o", "Isyarat apakah yang ditunjukkan?", ["k", "m", "n", "o"], "o"),
  imageMultipleProblem(levelId, 11, "Pilih gambar untuk huruf O.", ["l", "o", "n", "k"], "o"),
  imageMultipleProblem(levelId, 12, "Manakah gambar yang menunjukkan M?", ["l", "o", "m", "k"], "m"),
  imagePromptProblem(levelId, 13, "k", "Huruf apakah yang ditunjukkan?", ["k", "l", "n", "o"], "k"),
  imagePromptProblem(levelId, 14, "l", "Huruf apakah yang ditunjukkan?", ["k", "l", "n", "o"], "l"),
  imagePromptProblem(levelId, 15, "m", "Huruf apakah yang ditunjukkan?", ["k", "l", "n", "m"], "m"),
]);
