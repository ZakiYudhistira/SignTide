import type { ChoiceVisual, ImageMultipleChoice, MultipleChoice } from "~/models/level";
import { learningAssetUrl } from "~/utils/learning-asset.server";
import type { ScoredImageMultipleProblem, ScoredImagePromptMultipleChoiceProblem, ScoredLevelProblem, ScoredLineMatchProblem, ScoredSignToWordOrderProblem } from "../level-catalog.server";

function assetName(word: string) {
  return word.trim().toLowerCase().split(/\s+/).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
}

export function wordVisual(word: string): ChoiceVisual {
  return { kind: "image", src: learningAssetUrl(`kata/${assetName(word)}.png`), alt: `Isyarat untuk kata ${word}` };
}

function idFor(word: string) { return word.toLowerCase().replaceAll(" ", "-"); }
function textChoice(word: string): MultipleChoice { return { id: idFor(word), label: word }; }
function imageChoice(word: string): ImageMultipleChoice { return { id: idFor(word), label: "", visual: wordVisual(word) }; }

export function imagePromptProblem(levelId: string, number: number, word: string, choices: readonly string[]) {
  return { id: `${levelId}-problem-${number}`, type: "image-prompt-multiple-choice", prompt: "Isyarat apa yang ditunjukkan?", promptVisual: wordVisual(word), choices: choices.map(textChoice), correctChoiceId: idFor(word) } satisfies ScoredImagePromptMultipleChoiceProblem;
}

export function imageMultipleProblem(levelId: string, number: number, word: string, choices: readonly string[]) {
  return { id: `${levelId}-problem-${number}`, type: "image-multiple", prompt: `Pilih gambar untuk kata ${word}.`, choices: choices.map(imageChoice), correctChoiceId: idFor(word) } satisfies ScoredImageMultipleProblem;
}

export function wordOrderProblem(levelId: string, number: number, words: readonly string[]) {
  return { id: `${levelId}-problem-${number}`, type: "sign-to-word-order", prompt: "Susun kata menjadi kalimat sederhana yang sesuai dengan gambar.", mascot: { image: "/signtide_character.png", alt: "SignTide mascot" }, imageOrder: words.map(wordVisual) as [ChoiceVisual, ...ChoiceVisual[]], wordChoices: [...words] as [string, ...string[]], answer: [...words] as [string, ...string[]] } satisfies ScoredSignToWordOrderProblem;
}

export function lineMatchProblem(levelId: string, number: number, words: readonly string[]) {
  const images = words.map((word) => ({ id: `image-${idFor(word)}`, visual: wordVisual(word) }));
  const answers = words.map((word) => ({ id: `answer-${idFor(word)}`, label: word }));
  return { id: `${levelId}-problem-${number}`, type: "line-match", prompt: "Tarik garis gambar dan pasangan kata yang sesuai!", images, answers, answer: words.map((word) => ({ imageId: `image-${idFor(word)}`, answerId: `answer-${idFor(word)}` })) } satisfies ScoredLineMatchProblem;
}

export function vocabularyProblems(levelId: string, words: readonly string[], sentenceSets: readonly string[][]) {
  const problems: ScoredLevelProblem[] = [];
  let number = 1;
  for (const word of words) { problems.push(imagePromptProblem(levelId, number++, word, words)); problems.push(imageMultipleProblem(levelId, number++, word, words)); }
  for (const sentence of sentenceSets) problems.push(wordOrderProblem(levelId, number++, sentence));
  problems.push(lineMatchProblem(levelId, number, words));
  return problems as [ScoredLevelProblem, ...ScoredLevelProblem[]];
}
