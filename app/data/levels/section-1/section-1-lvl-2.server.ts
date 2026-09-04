import {
  defineProblems,
  imageMultipleProblem,
  imagePromptProblem,
} from "./problem-helpers.server";

const levelId = "section-1-lvl-2";

export const level2Problems = defineProblems([
  imagePromptProblem(levelId, 1, "f", "Isyarat apa yang ditunjukkan?", ["f", "g", "h", "i"], "f"),
  imageMultipleProblem(levelId, 2, "Pilih gambar yang menunjukkan huruf F.", ["h", "f", "i", "g"], "f"),
  imagePromptProblem(levelId, 3, "g", "Isyarat apakah yang ditunjukkan?", ["f", "g", "h", "i"], "g"),
  imageMultipleProblem(levelId, 4, "Pilih gambar untuk huruf G.", ["h", "f", "i", "g"], "g"),
  imagePromptProblem(levelId, 5, "h", "Isyarat apakah yang ditunjukkan?", ["f", "g", "h", "i"], "h"),
  imageMultipleProblem(levelId, 6, "Pilih gambar untuk huruf H.", ["g", "f", "h"], "h"),
  imagePromptProblem(levelId, 7, "h", "Huruf apakah yang ditunjukkan?", ["f", "i", "h", "g"], "h"),
  imagePromptProblem(levelId, 8, "i", "Isyarat apakah yang ditunjukkan?", ["g", "h", "i", "j"], "i"),
  imageMultipleProblem(levelId, 9, "Pilih gambar untuk huruf I.", ["g", "f", "i", "h"], "i"),
  imagePromptProblem(levelId, 10, "j", "Isyarat apakah yang ditunjukkan?", ["f", "h", "i", "j"], "j"),
  imageMultipleProblem(levelId, 11, "Pilih gambar untuk huruf J.", ["g", "j", "i", "f"], "j"),
  imageMultipleProblem(levelId, 12, "Manakah gambar yang menunjukkan H?", ["g", "j", "h", "f"], "h"),
  imagePromptProblem(levelId, 13, "f", "Huruf apakah yang ditunjukkan?", ["f", "g", "i", "j"], "f"),
  imagePromptProblem(levelId, 14, "g", "Huruf apakah yang ditunjukkan?", ["f", "g", "j", "i"], "g"),
  imagePromptProblem(levelId, 15, "h", "Huruf apakah yang ditunjukkan?", ["f", "g", "i", "h"], "h"),
]);
