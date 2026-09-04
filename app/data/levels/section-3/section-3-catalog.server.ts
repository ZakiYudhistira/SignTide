import type { ScoredLevelDefinition } from "../level-catalog.server";
import { placeholderProblems } from "../placeholder-problem.server";

export const section3LevelCatalog = {
  "section-3-lvl-1": { id: "section-3-lvl-1", title: "Benda di Kelas", description: "Placeholder materi benda di kelas.", lives: 5, problems: placeholderProblems("section-3-lvl-1") },
  "section-3-lvl-2": { id: "section-3-lvl-2", title: "Peralatan Belajar", description: "Placeholder materi peralatan belajar.", lives: 5, problems: placeholderProblems("section-3-lvl-2") },
  "section-3-lvl-3": { id: "section-3-lvl-3", title: "Di Dalam Kelas", description: "Placeholder materi di dalam kelas.", lives: 5, problems: placeholderProblems("section-3-lvl-3") },
  "section-3-lvl-4": { id: "section-3-lvl-4", title: "Tantangan Kelas", description: "Placeholder tantangan Act 3.", lives: 5, reward: { name: "blueberry" }, problems: placeholderProblems("section-3-lvl-4") },
} satisfies Record<string, ScoredLevelDefinition>;
