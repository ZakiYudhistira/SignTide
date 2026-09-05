import type { ScoredLevelDefinition } from "../level-catalog.server";
import { vocabularyProblems } from "./problem-helpers.server";

export const section3LevelCatalog = {
  "section-3-lvl-1": { id: "section-3-lvl-1", title: "Peralatan Belajar", description: "Pelajari gunting, pulpen, tas, buku, dan penghapus.", lives: 5, problems: vocabularyProblems("section-3-lvl-1", ["Gunting", "Pulpen", "Tas", "Buku", "Penghapus"], [["Gunting", "Dan", "Papan"], ["Buku", "Dan", "Meja"], ["Pulpen", "Aku"]]) },
  "section-3-lvl-2": { id: "section-3-lvl-2", title: "Benda Dalam Kelas", description: "Kenali kembali benda-benda yang ada di dalam kelas.", lives: 5, problems: vocabularyProblems("section-3-lvl-2", ["Kelas", "Kursi", "Papan", "Meja"], [["Kursi", "Dan", "Meja"], ["Kelas", "Aku"]]) },
  "section-3-lvl-3": { id: "section-3-lvl-3", title: "Lampu dan Lantai", description: "Pelajari kosakata lampu, lantai, kursi, meja, dan papan.", lives: 5, problems: vocabularyProblems("section-3-lvl-3", ["Lampu", "Papan", "Lantai", "Kursi", "Meja"], [["Lampu", "Dan", "Lantai"], ["Meja", "Dan", "Kursi"], ["Lantai", "Kelas", "Aku"]]) },
  "section-3-lvl-4": { id: "section-3-lvl-4", title: "Tantangan Kelas", description: "Uji pemahaman kosakata benda-benda di kelas.", lives: 5, reward: { name: "blueberry" }, problems: vocabularyProblems("section-3-lvl-4", ["Gunting", "Tas", "Kelas", "Lampu", "Meja", "Murid", "Buku", "Papan", "Lantai"], [["Lantai", "Kelas", "Aku"], ["Meja", "Dan", "Papan"]]) },
} satisfies Record<string, ScoredLevelDefinition>;
