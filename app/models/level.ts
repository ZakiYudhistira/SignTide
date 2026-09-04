export type ChoiceVisual =
  | { kind: "image"; src: string; alt: string }
  | { kind: "emoji"; value: string; alt: string };

export type ImageMultipleChoice = {
  id: string;
  label: string;
  visual: ChoiceVisual;
};

export type ImageMultipleProblem = {
  id: string;
  type: "image-multiple";
  eyebrow?: string;
  prompt: string;
  choices: ImageMultipleChoice[];
};

export type MultipleChoice = {
  id: string;
  label: string;
};

export type MultipleChoiceProblem = {
  id: string;
  type: "multiple-choice";
  eyebrow?: string;
  prompt: string;
  choices: MultipleChoice[];
};

export type ImagePromptMultipleChoiceProblem = {
  id: string;
  type: "image-prompt-multiple-choice";
  eyebrow?: string;
  prompt: string;
  promptVisual: ChoiceVisual;
  choices: MultipleChoice[];
};

export type SignToWordOrderProblem = {
  id: string;
  type: "sign-to-word-order";
  eyebrow?: string;
  prompt: string;
  mascot: {
    image: string;
    alt: string;
  };
  imageOrder: [ChoiceVisual, ...ChoiceVisual[]];
  wordChoices: [string, ...string[]];
};

export type LineMatchPair = {
  imageId: string;
  answerId: string;
};

export type LineMatchProblem = {
  id: string;
  type: "line-match";
  eyebrow?: string;
  prompt: string;
  images: Array<{
    id: string;
    visual: ChoiceVisual;
  }>;
  answers: Array<{
    id: string;
    label: string;
  }>;
};

// Extend this union when another problem template is introduced.
export type LevelProblem =
  | ImageMultipleProblem
  | MultipleChoiceProblem
  | ImagePromptMultipleChoiceProblem;

export type LevelDefinition = {
  id: string;
  title: string;
  description: string;
  lives: number;
  problems: [LevelProblem, ...LevelProblem[]];
};

export type RewardItemName =
  | "bread"
  | "veggies"
  | "meat"
  | "yoghurt"
  | "blueberry"
  | "banana";

export type LevelResult = {
  score: number;
  total: number;
  xpAwarded?: number;
};

export type ProblemGrade = {
  problemId: string;
  selectedChoiceId: string;
  correctChoiceId: string;
  correctAnswerLabel: string;
  isCorrect: boolean;
};

export type LevelActionData =
  | { intent: "grade-problem"; grade: ProblemGrade }
  | { intent: "finish-level"; result: LevelResult };
