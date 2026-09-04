import type {
  ImageMultipleChoice,
  MultipleChoice,
} from "~/models/level";
import { learningAssetUrl } from "~/utils/learning-asset.server";

import type {
  ScoredImageMultipleProblem,
  ScoredImagePromptMultipleChoiceProblem,
  ScoredLevelProblem,
} from "../level-catalog.server";

function normalizeLetter(letter: string) {
  return letter.toLowerCase();
}

function imageChoice(letter: string): ImageMultipleChoice {
  const uppercaseLetter = letter.toUpperCase();

  return {
    id: normalizeLetter(letter),
    label: "",
    visual: {
      kind: "image",
      src: learningAssetUrl(`alphabet/SIBI_${uppercaseLetter}.png`),
      alt: `Isyarat tangan untuk huruf ${uppercaseLetter}`,
    },
  };
}

function textChoice(letter: string): MultipleChoice {
  const uppercaseLetter = letter.toUpperCase();

  return {
    id: normalizeLetter(letter),
    label: uppercaseLetter,
  };
}

export function imagePromptProblem(
  levelId: string,
  number: number,
  imageLetter: string,
  prompt: string,
  choiceLetters: readonly string[],
  correctLetter: string,
): ScoredImagePromptMultipleChoiceProblem {
  const uppercaseLetter = imageLetter.toUpperCase();

  return {
    id: `${levelId}-problem-${number}`,
    type: "image-prompt-multiple-choice",
    prompt,
    promptVisual: {
      kind: "image",
      src: learningAssetUrl(`alphabet/SIBI_${uppercaseLetter}.png`),
      alt: `Isyarat tangan untuk huruf ${uppercaseLetter}`,
    },
    choices: choiceLetters.map(textChoice),
    correctChoiceId: normalizeLetter(correctLetter),
  };
}

export function imageMultipleProblem(
  levelId: string,
  number: number,
  prompt: string,
  choiceLetters: readonly string[],
  correctLetter: string,
): ScoredImageMultipleProblem {
  return {
    id: `${levelId}-problem-${number}`,
    type: "image-multiple",
    prompt,
    choices: choiceLetters.map(imageChoice),
    correctChoiceId: normalizeLetter(correctLetter),
  };
}

export function defineProblems<TProblems extends [ScoredLevelProblem, ...ScoredLevelProblem[]]>(
  problems: TProblems,
) {
  return problems;
}
