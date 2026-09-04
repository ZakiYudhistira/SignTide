import {
  defineProblems,
  imageMultipleProblem,
  imagePromptProblem,
} from "./problem-helpers.server";

const levelId = "section-1-lvl-4";

export const level4Problems = defineProblems([
  imagePromptProblem(levelId, 1, "p", "Isyarat apa yang ditunjukkan?", ["p", "q", "r", "t"], "p"),
  imageMultipleProblem(levelId, 2, "Pilih gambar yang menunjukkan huruf P.", ["q", "p", "s", "r"], "p"),
  imagePromptProblem(levelId, 3, "q", "Isyarat apakah yang ditunjukkan?", ["p", "q", "r", "t"], "q"),
  imageMultipleProblem(levelId, 4, "Pilih gambar untuk huruf Q.", ["r", "p", "s", "q"], "q"),
  imagePromptProblem(levelId, 5, "r", "Isyarat apakah yang ditunjukkan?", ["p", "q", "r", "s"], "r"),
  imageMultipleProblem(levelId, 6, "Pilih gambar untuk huruf R.", ["q", "p", "r"], "r"),
  imagePromptProblem(levelId, 7, "r", "Huruf apakah yang ditunjukkan?", ["p", "q", "r", "t"], "r"),
  imagePromptProblem(levelId, 8, "s", "Isyarat apakah yang ditunjukkan?", ["q", "r", "s", "t"], "s"),
  imageMultipleProblem(levelId, 9, "Pilih gambar untuk huruf S.", ["q", "p", "s", "r"], "s"),
  imagePromptProblem(levelId, 10, "t", "Isyarat apakah yang ditunjukkan?", ["p", "r", "s", "t"], "t"),
  imageMultipleProblem(levelId, 11, "Pilih gambar untuk huruf T.", ["q", "t", "s", "p"], "t"),
  imageMultipleProblem(levelId, 12, "Manakah gambar yang menunjukkan R?", ["q", "t", "r", "p"], "r"),
  imagePromptProblem(levelId, 13, "p", "Huruf apakah yang ditunjukkan?", ["p", "q", "s", "t"], "p"),
  imagePromptProblem(levelId, 14, "q", "Huruf apakah yang ditunjukkan?", ["p", "q", "t", "s"], "q"),
  imagePromptProblem(levelId, 15, "r", "Huruf apakah yang ditunjukkan?", ["p", "q", "s", "r"], "r"),
]);
