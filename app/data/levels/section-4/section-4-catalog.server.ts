import type { ScoredLevelDefinition } from "../level-catalog.server";
import { vocabularyProblems } from "../section-3/problem-helpers.server";

export const section4LevelCatalog = {
  "section-4-lvl-1": {
    id: "section-4-lvl-1",
    title: "Meminta Bantuan",
    description: "Pelajari kata bantu, maaf, tolak, tentu, dan izin.",
    lives: 5,
    problems: vocabularyProblems("section-4-lvl-1", ["Bantu", "Maaf", "Tolak", "Izin", "Tentu"], [["Maaf", "Dan", "Terima Kasih"], ["Tentu", "Aku", "Bantu"], ["Tolak", "Maaf"]]),
  },
  "section-4-lvl-2": {
    id: "section-4-lvl-2",
    title: "Tidak Paham",
    description: "Pelajari kata tidak paham, ulang, bantu, dan ajarkan.",
    lives: 5,
    problems: vocabularyProblems("section-4-lvl-2", ["Tidak Paham", "Ulang", "Bantu", "Ajarkan"], [["Aku", "Tidak Paham"], ["Ajarkan", "Aku", "Tidak Paham"], ["Bantu", "Ulang"]]),
  },
  "section-4-lvl-3": {
    id: "section-4-lvl-3",
    title: "Tantangan Bantuan",
    description: "Uji pemahaman seluruh kosakata bantuan dan komunikasi.",
    lives: 5,
    reward: { name: "banana" },
    problems: vocabularyProblems("section-4-lvl-3", ["Bantu", "Ulang", "Maaf", "Tolak", "Tentu", "Izin", "Tidak Paham", "Ajarkan"], [["Tentu", "Aku", "Bantu"], ["Maaf", "Dan", "Terima Kasih"], ["Bantu", "Ulang"]]),
  },
} satisfies Record<string, ScoredLevelDefinition>;
