import type { ScoredLevelDefinition } from "../level-catalog.server";
import { placeholderProblems } from "../placeholder-problem.server";

export const section2LevelCatalog = {
  "section-2-lvl-1": { id: "section-2-lvl-1", title: "Salam", description: "Placeholder materi salam.", lives: 5, problems: placeholderProblems("section-2-lvl-1") },
  "section-2-lvl-2": { id: "section-2-lvl-2", title: "Namaku", description: "Placeholder materi memperkenalkan nama.", lives: 5, problems: placeholderProblems("section-2-lvl-2") },
  "section-2-lvl-3": { id: "section-2-lvl-3", title: "Tentang Aku", description: "Placeholder materi tentang diri.", lives: 5, reward: { name: "yoghurt" }, problems: placeholderProblems("section-2-lvl-3") },
  "section-2-lvl-4": { id: "section-2-lvl-4", title: "Kesukaanku", description: "Placeholder materi kesukaan.", lives: 5, problems: placeholderProblems("section-2-lvl-4") },
  "section-2-lvl-5": { id: "section-2-lvl-5", title: "Tantangan Perkenalan", description: "Placeholder tantangan Act 2.", lives: 5, problems: placeholderProblems("section-2-lvl-5") },
} satisfies Record<string, ScoredLevelDefinition>;
