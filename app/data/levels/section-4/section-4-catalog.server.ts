import type { ScoredLevelDefinition } from "../level-catalog.server";
import { placeholderProblems } from "../placeholder-problem.server";

export const section4LevelCatalog = {
  "section-4-lvl-1": { id: "section-4-lvl-1", title: "Meminta Bantuan", description: "Placeholder materi meminta bantuan.", lives: 5, problems: placeholderProblems("section-4-lvl-1") },
  "section-4-lvl-2": { id: "section-4-lvl-2", title: "Bantuan Guru", description: "Placeholder materi bantuan guru.", lives: 5, problems: placeholderProblems("section-4-lvl-2") },
  "section-4-lvl-3": { id: "section-4-lvl-3", title: "Tantangan Bantuan", description: "Placeholder tantangan Act 4.", lives: 5, reward: { name: "banana" }, problems: placeholderProblems("section-4-lvl-3") },
} satisfies Record<string, ScoredLevelDefinition>;
