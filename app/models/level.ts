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

// Extend this union when another problem template is introduced.
export type LevelProblem = ImageMultipleProblem;

export type LevelDefinition = {
  id: string;
  title: string;
  description: string;
  lives: number;
  problems: [LevelProblem, ...LevelProblem[]];
};

export type LevelResult = {
  score: number;
  total: number;
  xpAwarded?: number;
};
