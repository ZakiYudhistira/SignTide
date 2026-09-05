import type {
  ChoiceVisual,
  ImageMultipleChoice,
  MultipleChoice,
} from "~/models/level";
import { learningAssetUrl } from "~/utils/learning-asset.server";

import type {
  ScoredImageMultipleProblem,
  ScoredImagePromptMultipleChoiceProblem,
  ScoredLevelProblem,
  ScoredLineMatchProblem,
  ScoredSignToWordOrderProblem,
} from "../level-catalog.server";

const assetNames: Record<string, string> = {
  AKU: "Aku",
  ASAL: "Asal",
  BUKU: "Buku",
  DAN: "Dan",
  GURU: "Guru",
  HALO: "Halo",
  HOBI: "Hobi",
  KELAS: "Kelas",
  KURSI: "Kursi",
  MAAF: "Maaf",
  MEJA: "Meja",
  MURID: "Murid",
  NAMA: "Nama",
  PAPAN: "Papan",
  SALAM: "Salam",
  TAS: "Tas",
  "TERIMA KASIH": "TerimaKasih",
  TOLAK: "Tolak",
  USIA: "Usia",
};

export function wordVisual(word: string): ChoiceVisual {
  const assetName = assetNames[word.toUpperCase()];
  if (!assetName) throw new Error(`Missing Act 2 asset mapping for ${word}`);

  return {
    kind: "image",
    src: learningAssetUrl(`kata/${assetName}.png`),
    alt: `Isyarat untuk kata ${word}`,
  };
}

function textChoice(word: string): MultipleChoice {
  return { id: word.toLowerCase().replaceAll(" ", "-"), label: word };
}

function imageChoice(word: string): ImageMultipleChoice {
  return { id: word.toLowerCase().replaceAll(" ", "-"), label: "", visual: wordVisual(word) };
}

export function imagePromptProblem(
  levelId: string,
  number: number,
  imageWord: string,
  prompt: string,
  choices: readonly string[],
): ScoredImagePromptMultipleChoiceProblem {
  return {
    id: `${levelId}-problem-${number}`,
    type: "image-prompt-multiple-choice",
    prompt,
    promptVisual: wordVisual(imageWord),
    choices: choices.map(textChoice),
    correctChoiceId: textChoice(imageWord).id,
  };
}

export function imageMultipleProblem(
  levelId: string,
  number: number,
  prompt: string,
  imageWord: string,
  choices: readonly string[],
): ScoredImageMultipleProblem {
  return {
    id: `${levelId}-problem-${number}`,
    type: "image-multiple",
    prompt,
    choices: choices.map(imageChoice),
    correctChoiceId: textChoice(imageWord).id,
  };
}

export function wordOrderProblem(
  levelId: string,
  number: number,
  prompt: string,
  words: readonly string[],
  answer: readonly string[],
): ScoredSignToWordOrderProblem {
  return {
    id: `${levelId}-problem-${number}`,
    type: "sign-to-word-order",
    prompt,
    mascot: { image: "/signtide_character.png", alt: "SignTide mascot" },
    imageOrder: words.map(wordVisual) as [ChoiceVisual, ...ChoiceVisual[]],
    wordChoices: [...new Set([...words, ...answer])] as [string, ...string[]],
    answer: [...answer] as [string, ...string[]],
  };
}

export function lineMatchProblem(
  levelId: string,
  number: number,
  prompt: string,
  words: readonly string[],
): ScoredLineMatchProblem {
  const images = words.map((word) => ({ id: `image-${textChoice(word).id}`, visual: wordVisual(word) }));
  const answers = words.map((word) => ({ id: `answer-${textChoice(word).id}`, label: word }));

  return {
    id: `${levelId}-problem-${number}`,
    type: "line-match",
    prompt,
    images,
    answers,
    answer: words.map((word) => ({
      imageId: `image-${textChoice(word).id}`,
      answerId: `answer-${textChoice(word).id}`,
    })),
  };
}

export function defineProblems<TProblems extends [ScoredLevelProblem, ...ScoredLevelProblem[]]>(
  problems: TProblems,
) {
  return problems;
}
