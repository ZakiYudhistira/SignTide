import type { ChoiceVisual, ImageMultipleChoice, MultipleChoice } from "~/models/level";
import { learningAssetUrl } from "~/utils/learning-asset.server";
import type { ScoredImageMultipleProblem, ScoredImagePromptMultipleChoiceProblem, ScoredLevelProblem, ScoredLineMatchProblem, ScoredSignToWordOrderProblem } from "../level-catalog.server";

function assetName(word: string) {
  const pascalName = word.trim().toLowerCase().split(/\s+/).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
  return pascalName.replace(/^-([a-z])/, (_, letter: string) => `-${letter.toUpperCase()}`);
}

export function visual(word: string): ChoiceVisual {
  return { kind: "image", src: learningAssetUrl(`kata/${assetName(word)}.png`), alt: `Isyarat untuk kata ${word}` };
}

const idFor = (word: string) => word.toLowerCase().replaceAll(" ", "-");
const textChoice = (word: string): MultipleChoice => ({ id: idFor(word), label: word });
const imageChoice = (word: string): ImageMultipleChoice => ({ id: idFor(word), label: "", visual: visual(word) });

export function imagePrompt(levelId: string, number: number, word: string, choices: readonly string[]) {
  return { id: `${levelId}-problem-${number}`, type: "image-prompt-multiple-choice", prompt: "Isyarat apa yang ditunjukkan?", promptVisual: visual(word), choices: choices.map(textChoice), correctChoiceId: idFor(word) } satisfies ScoredImagePromptMultipleChoiceProblem;
}

export function imageMultiple(levelId: string, number: number, word: string, choices: readonly string[]) {
  return { id: `${levelId}-problem-${number}`, type: "image-multiple", prompt: `Pilih gambar untuk kata ${word}.`, choices: choices.map(imageChoice), correctChoiceId: idFor(word) } satisfies ScoredImageMultipleProblem;
}

export function wordOrder(levelId: string, number: number, imageWords: readonly string[], choices: readonly string[], answer: readonly string[]) {
  return { id: `${levelId}-problem-${number}`, type: "sign-to-word-order", prompt: "Susun kata menjadi kalimat sederhana yang sesuai dengan gambar.", mascot: { image: "/signtide_character.png", alt: "SignTide mascot" }, imageOrder: imageWords.map(visual) as [ChoiceVisual, ...ChoiceVisual[]], wordChoices: [...choices] as [string, ...string[]], answer: [...answer] as [string, ...string[]] } satisfies ScoredSignToWordOrderProblem;
}

export function lineMatch(levelId: string, number: number, words: readonly string[]) {
  const images = words.map((word) => ({ id: `image-${idFor(word)}`, visual: visual(word) }));
  const answers = words.map((word) => ({ id: `answer-${idFor(word)}`, label: word }));
  return { id: `${levelId}-problem-${number}`, type: "line-match", prompt: "Tarik garis gambar dan pasangan kata yang sesuai!", images, answers, answer: words.map((word) => ({ imageId: `image-${idFor(word)}`, answerId: `answer-${idFor(word)}` })) } satisfies ScoredLineMatchProblem;
}

export function defineProblems(problems: ScoredLevelProblem[]) {
  return problems as [ScoredLevelProblem, ...ScoredLevelProblem[]];
}
