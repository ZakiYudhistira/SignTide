import type {
  ImageMultipleChoice,
  ImageMultipleProblem,
  ImagePromptMultipleChoiceProblem,
  LevelDefinition,
  MultipleChoice,
  MultipleChoiceProblem,
  RewardItemName,
} from "~/models/level";
import { learningAssetUrl } from "~/utils/learning-asset.server";

export type ScoredImageMultipleProblem = ImageMultipleProblem & {
  correctChoiceId: string;
};

export type ScoredMultipleChoiceProblem = MultipleChoiceProblem & {
  correctChoiceId: string;
};

export type ScoredImagePromptMultipleChoiceProblem =
  ImagePromptMultipleChoiceProblem & {
    correctChoiceId: string;
  };

export type ScoredLevelProblem =
  | ScoredImageMultipleProblem
  | ScoredMultipleChoiceProblem
  | ScoredImagePromptMultipleChoiceProblem;

export type ScoredLevelDefinition = Omit<LevelDefinition, "problems"> & {
  problems: [ScoredLevelProblem, ...ScoredLevelProblem[]];
  reward?: { name: RewardItemName };
};

export function defineLevel<TProblems extends [ScoredLevelProblem, ...ScoredLevelProblem[]]>(
  level: Omit<LevelDefinition, "problems"> & { problems: TProblems },
) {
  return level;
}

function alphabetChoice(letter: string): ImageMultipleChoice {
  const uppercaseLetter = letter.toUpperCase();

  return {
    id: letter.toLowerCase(),
    label: "",
    visual: {
      kind: "image",
      src: learningAssetUrl(`alphabet/SIBI_${uppercaseLetter}.png`),
      alt: `Isyarat tangan untuk huruf ${uppercaseLetter}`,
    },
  };
}

const alphabetChoices = Array.from({ length: 26 }, (_, index) =>
  alphabetChoice(String.fromCharCode(97 + index)),
);

function shuffleChoices<T>(choices: readonly T[], seed: string): T[] {
  const shuffled = [...choices];
  let state = [...seed].reduce(
    (hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0,
    7,
  );

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const swapIndex = state % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

function alphabetTextChoice(letter: string): MultipleChoice {
  return { id: letter.toLowerCase(), label: letter.toUpperCase() };
}

function alphabetProblem(
  letter: string,
  levelLetters: string,
  levelId: string,
): ScoredImageMultipleProblem {
  const choicesForLevel = alphabetChoices.filter((choice) =>
    levelLetters.toLowerCase().includes(choice.id),
  );
  const shuffledDistractors = shuffleChoices(
    choicesForLevel.filter((choice) => choice.id !== letter),
    `${levelId}-distractors-${letter}`,
  );
  const choices = shuffleChoices(
    [
      choicesForLevel.find((choice) => choice.id === letter)!,
      ...shuffledDistractors.slice(0, 3),
    ],
    `${levelId}-choices-${letter}`,
  );

  return {
    id: `find-${levelId}-${letter}`,
    type: "image-multiple",
    eyebrow: "KOSAKATA BARU!",
    prompt: `Yang manakah huruf "${letter.toUpperCase()}"?`,
    choices,
    correctChoiceId: letter,
  };
}

function alphabetImagePromptProblem(
  letter: string,
  levelLetters: string,
  levelId: string,
): ScoredImagePromptMultipleChoiceProblem {
  const availableChoices = levelLetters.split("").map(alphabetTextChoice);
  const distractors = shuffleChoices(
    availableChoices.filter((choice) => choice.id !== letter),
    `${levelId}-text-distractors-${letter}`,
  );
  const choices = shuffleChoices(
    [alphabetTextChoice(letter), ...distractors.slice(0, 3)],
    `${levelId}-text-choices-${letter}`,
  );
  const uppercaseLetter = letter.toUpperCase();

  return {
    id: `name-${levelId}-${letter}`,
    type: "image-prompt-multiple-choice",
    prompt: "Huruf apakah ini?",
    promptVisual: {
      kind: "image",
      src: learningAssetUrl(`alphabet/SIBI_${uppercaseLetter}.png`),
      alt: `Isyarat tangan untuk huruf ${uppercaseLetter}`,
    },
    choices,
    correctChoiceId: letter,
  };
}

export const levelCatalog = {
  "section-1-lvl-1": {
    id: "section-1-lvl-1",
    title: "Huruf A-E",
    description: "Mengenal isyarat dasar untuk huruf A sampai E.",
    lives: 5,
    reward: { name: "bread" },
    problems: [
      alphabetProblem("a", "abcde", "section-1-lvl-1"),
      ..."bcd".split("").map((letter) =>
        alphabetProblem(letter, "abcde", "section-1-lvl-1"),
      ),
      alphabetImagePromptProblem("e", "abcde", "section-1-lvl-1"),
    ] as [ScoredLevelProblem, ...ScoredLevelProblem[]],
  },
  "section-1-lvl-2": {
    id: "section-1-lvl-2",
    title: "Huruf F-J",
    description: "Mengenal isyarat dasar untuk huruf F sampai J.",
    lives: 5,
    problems: "fghij".split("").map((letter) =>
      alphabetProblem(letter, "fghij", "section-1-lvl-2"),
    ) as [ScoredImageMultipleProblem, ...ScoredImageMultipleProblem[]],
  },
  "section-1-lvl-3": {
    id: "section-1-lvl-3",
    title: "Huruf K-O",
    description: "Mengenal isyarat dasar untuk huruf K sampai O.",
    lives: 5,
    reward: { name: "veggies" },
    problems: "klmno".split("").map((letter) =>
      alphabetProblem(letter, "klmno", "section-1-lvl-3"),
    ) as [ScoredImageMultipleProblem, ...ScoredImageMultipleProblem[]],
  },
  "section-1-lvl-4": {
    id: "section-1-lvl-4",
    title: "Huruf P-T",
    description: "Mengenal isyarat dasar untuk huruf P sampai T.",
    lives: 5,
    problems: "pqrst".split("").map((letter) =>
      alphabetProblem(letter, "pqrst", "section-1-lvl-4"),
    ) as [ScoredImageMultipleProblem, ...ScoredImageMultipleProblem[]],
  },
  "section-1-lvl-5": {
    id: "section-1-lvl-5",
    title: "Huruf U-Z",
    description: "Mengenal isyarat dasar untuk huruf U sampai Z.",
    lives: 5,
    reward: { name: "meat" },
    problems: "uvwxyz".split("").map((letter) =>
      alphabetProblem(letter, "uvwxyz", "section-1-lvl-5"),
    ) as [ScoredImageMultipleProblem, ...ScoredImageMultipleProblem[]],
  },
} satisfies Record<string, ScoredLevelDefinition>;

export type LevelIdentifier = keyof typeof levelCatalog;
