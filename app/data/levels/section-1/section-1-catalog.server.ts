import type { ScoredLevelDefinition } from "../level-catalog.server";

import { level1Problems } from "./section-1-lvl-1.server";
import { level2Problems } from "./section-1-lvl-2.server";
import { level3Problems } from "./section-1-lvl-3.server";
import { level4Problems } from "./section-1-lvl-4.server";
import { level5Problems } from "./section-1-lvl-5.server";
import { level6Problems } from "./section-1-lvl-6.server";

export const section1LevelCatalog = {
  "section-1-lvl-1": {
    id: "section-1-lvl-1",
    title: "Huruf A-E",
    description: "Mengenal isyarat dasar untuk huruf A sampai E.",
    lives: 5,
    reward: { name: "bread" },
    problems: level1Problems,
  },
  "section-1-lvl-2": {
    id: "section-1-lvl-2",
    title: "Huruf F-J",
    description: "Mengenal isyarat dasar untuk huruf F sampai J.",
    lives: 5,
    problems: level2Problems,
  },
  "section-1-lvl-3": {
    id: "section-1-lvl-3",
    title: "Huruf K-O",
    description: "Mengenal isyarat dasar untuk huruf K sampai O.",
    lives: 5,
    reward: { name: "veggies" },
    problems: level3Problems,
  },
  "section-1-lvl-4": {
    id: "section-1-lvl-4",
    title: "Huruf P-T",
    description: "Mengenal isyarat dasar untuk huruf P sampai T.",
    lives: 5,
    problems: level4Problems,
  },
  "section-1-lvl-5": {
    id: "section-1-lvl-5",
    title: "Huruf U-Z",
    description: "Mengenal isyarat dasar untuk huruf U sampai Z.",
    lives: 5,
    problems: level5Problems,
  },
  "section-1-lvl-6": {
    id: "section-1-lvl-6",
    title: "Tantangan Akhir",
    description: "Tantangan akhir Act 1.",
    lives: 5,
    reward: { name: "meat" },
    problems: level6Problems,
  },
} satisfies Record<string, ScoredLevelDefinition>;
