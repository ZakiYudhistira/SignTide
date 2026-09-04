import type { ScoredLevelDefinition } from "../level-catalog.server";
import { placeholderProblems } from "../placeholder-problem.server";

export const section5LevelCatalog = {
  "section-5-lvl-1": {
    id: "section-5-lvl-1",
    title: "Kalimat Sapaan",
    description: "Placeholder materi kalimat sapaan.",
    lives: 5,
    problems: placeholderProblems("section-5-lvl-1"),
  },
  "section-5-lvl-2": {
    id: "section-5-lvl-2",
    title: "Kalimat Aktivitas",
    description: "Placeholder materi kalimat aktivitas.",
    lives: 5,
    problems: placeholderProblems("section-5-lvl-2"),
  },
  "section-5-lvl-3": {
    id: "section-5-lvl-3",
    title: "Kalimat Sehari-Hari",
    description: "Placeholder materi kalimat sehari-hari.",
    lives: 5,
    problems: placeholderProblems("section-5-lvl-3"),
  },
  "section-5-lvl-4": {
    id: "section-5-lvl-4",
    title: "Tantangan Kalimat",
    description: "Placeholder tantangan akhir Act 5.",
    lives: 5,
    problems: placeholderProblems("section-5-lvl-4"),
  },
} satisfies Record<string, ScoredLevelDefinition>;
