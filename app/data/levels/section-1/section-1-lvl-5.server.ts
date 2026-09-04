import {
  defineProblems,
  imageMultipleProblem,
  imagePromptProblem,
} from "./problem-helpers.server";

const levelId = "section-1-lvl-5";

export const level5Problems = defineProblems([
  imagePromptProblem(levelId, 1, "u", "Isyarat apa yang ditunjukkan?", ["u", "v", "y", "z"], "u"),
  imageMultipleProblem(levelId, 2, "Pilih gambar yang menunjukkan huruf U.", ["w", "u", "x", "v"], "u"),
  imagePromptProblem(levelId, 3, "v", "Isyarat apakah yang ditunjukkan?", ["u", "v", "w", "y"], "v"),
  imageMultipleProblem(levelId, 4, "Pilih gambar untuk huruf V.", ["w", "u", "x", "v"], "v"),
  imagePromptProblem(levelId, 5, "w", "Isyarat apakah yang ditunjukkan?", ["u", "v", "w", "x"], "w"),
  imageMultipleProblem(levelId, 6, "Pilih gambar untuk huruf W.", ["v", "u", "w"], "w"),
  imagePromptProblem(levelId, 7, "w", "Huruf apakah yang ditunjukkan?", ["u", "v", "w", "y"], "w"),
  imagePromptProblem(levelId, 8, "x", "Isyarat apakah yang ditunjukkan?", ["v", "z", "x", "y"], "x"),
  imageMultipleProblem(levelId, 9, "Pilih gambar untuk huruf X.", ["v", "y", "x", "z"], "x"),
  imagePromptProblem(levelId, 10, "y", "Isyarat apakah yang ditunjukkan?", ["u", "z", "x", "y"], "y"),
  imageMultipleProblem(levelId, 11, "Pilih gambar untuk huruf Y.", ["v", "y", "x", "w"], "y"),
  imageMultipleProblem(levelId, 12, "Pilih gambar untuk huruf Z.", ["v", "y", "z", "w"], "z"),
  imagePromptProblem(levelId, 13, "z", "Isyarat apakah yang ditunjukkan?", ["u", "z", "x", "y"], "z"),
  imageMultipleProblem(levelId, 14, "Manakah gambar yang menunjukkan W?", ["y", "u", "w", "x"], "w"),
  imagePromptProblem(levelId, 15, "u", "Huruf apakah yang ditunjukkan?", ["u", "v", "x", "z"], "u"),
  imagePromptProblem(levelId, 16, "v", "Huruf apakah yang ditunjukkan?", ["w", "v", "u", "y"], "v"),
  imagePromptProblem(levelId, 17, "w", "Huruf apakah yang ditunjukkan?", ["u", "y", "z", "w"], "w"),
  imagePromptProblem(levelId, 18, "x", "Huruf apakah yang ditunjukkan?", ["y", "w", "x", "z"], "x"),
  imagePromptProblem(levelId, 19, "y", "Huruf apakah yang ditunjukkan?", ["u", "y", "w", "x"], "y"),
  imagePromptProblem(levelId, 20, "z", "Huruf apakah yang ditunjukkan?", ["z", "v", "y", "u"], "z"),
]);
