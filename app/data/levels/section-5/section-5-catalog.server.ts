import type { ScoredLevelDefinition } from "../level-catalog.server";
import { defineProblems, imageMultiple, imagePrompt, lineMatch, wordOrder } from "./problem-helpers.server";

const level1 = defineProblems([
  imagePrompt("section-5-lvl-1", 1, "Makan", ["Makan", "Minum", "Tidur", "Baca"]),
  imageMultiple("section-5-lvl-1", 2, "Makan", ["Makan", "Tidur", "Baca", "Minum"]),
  wordOrder("section-5-lvl-1", 3, ["Aku", "Makan", "Dan", "Minum"], ["Makan", "Aku", "Dan", "Minum"], ["Aku", "Makan", "Dan", "Minum"]),
  imagePrompt("section-5-lvl-1", 4, "Minum", ["Tidur", "Makan", "Minum", "Baca"]),
  imageMultiple("section-5-lvl-1", 5, "Minum", ["Makan", "Tidur", "Baca", "Minum"]),
  wordOrder("section-5-lvl-1", 6, ["Bantu", "Aku", "Minum"], ["Bantu", "Aku", "Minum"], ["Bantu", "Aku", "Minum"]),
  imagePrompt("section-5-lvl-1", 7, "Tidur", ["Makan", "Tidur", "Baca", "Minum"]),
  imageMultiple("section-5-lvl-1", 8, "Tidur", ["Baca", "Makan", "Tidur", "Minum"]),
  wordOrder("section-5-lvl-1", 9, ["Aku", "Baca", "Buku"], ["Buku", "Aku", "Baca"], ["Aku", "Baca", "Buku"]),
  imagePrompt("section-5-lvl-1", 10, "Baca", ["Makan", "Minum", "Tidur", "Baca"]),
  imageMultiple("section-5-lvl-1", 11, "Baca", ["Tidur", "Baca", "Makan", "Minum"]),
  wordOrder("section-5-lvl-1", 12, ["Aku", "Tidak Paham"], ["Aku", "Tidak", "Paham"], ["Aku", "Tidak", "Paham"]),
  imagePrompt("section-5-lvl-1", 13, "Lihat", ["Baca", "Minum", "Lihat", "Makan"]),
  imageMultiple("section-5-lvl-1", 14, "Lihat", ["Lihat", "Tidur", "Minum", "Baca"]),
  lineMatch("section-5-lvl-1", 15, ["Lihat", "Minum", "Baca", "Makan", "Tidur"]),
]);

const level2 = defineProblems([
  imagePrompt("section-5-lvl-2", 1, "Ber-", ["Ber-", "Me-", "Di-", "Se-"]), imageMultiple("section-5-lvl-2", 2, "Ber-", ["Ber-", "Me-", "Di-", "Se-"]),
  imagePrompt("section-5-lvl-2", 3, "Me-", ["Di-", "Ber-", "Me-", "Se-"]), imageMultiple("section-5-lvl-2", 4, "Me-", ["Di-", "Ber-", "Se-", "Me-"]),
  imagePrompt("section-5-lvl-2", 5, "Di-", ["Ber-", "Di-", "Se-", "Me-"]), imageMultiple("section-5-lvl-2", 6, "Di-", ["Se-", "Ber-", "Di-", "Me-"]),
  imagePrompt("section-5-lvl-2", 7, "Se-", ["Ber-", "Se-", "Me-", "Di-"]), imageMultiple("section-5-lvl-2", 8, "Se-", ["Me-", "Ber-", "Se-", "Di-"]),
  imagePrompt("section-5-lvl-2", 9, "Ke-", ["Ke-", "Se-", "Me-", "Di-"]), imageMultiple("section-5-lvl-2", 10, "Ke-", ["Me-", "Ber-", "Se-", "Ke-"]),
  imagePrompt("section-5-lvl-2", 11, "Pe-", ["Ke-", "Pe-", "Me-", "Di-"]), imageMultiple("section-5-lvl-2", 12, "Pe-", ["Me-", "Ber-", "Pe-", "Ke-"]),
  imagePrompt("section-5-lvl-2", 13, "Ter-", ["Ke-", "Se-", "Ter-", "Di-"]), imageMultiple("section-5-lvl-2", 14, "Ter-", ["Ter-", "Ber-", "Se-", "Ke-"]),
  imagePrompt("section-5-lvl-2", 15, "Ber-", ["Ke-", "Ber-", "Me-", "Di-"]),
]);

const level3 = defineProblems([
  imagePrompt("section-5-lvl-3", 1, "-I", ["-I", "-An", "-Nya", "-Kan"]), imageMultiple("section-5-lvl-3", 2, "-I", ["-I", "-An", "-Nya", "-Kan"]),
  imagePrompt("section-5-lvl-3", 3, "-An", ["-Nya", "-I", "-An", "-Kan"]), imageMultiple("section-5-lvl-3", 4, "-An", ["-Kan", "-Nya", "-I", "-An"]),
  imagePrompt("section-5-lvl-3", 5, "-Nya", ["-I", "-Nya", "-Kan", "-An"]),
  imagePrompt("section-5-lvl-3", 6, "Buku", ["Guru", "Murid", "Kelas", "Buku"]), imageMultiple("section-5-lvl-3", 7, "Buku", ["Murid", "Buku", "Guru", "Kelas"]),
  imagePrompt("section-5-lvl-3", 8, "Papan", ["Murid", "Guru", "Papan", "Kelas"]), imageMultiple("section-5-lvl-3", 9, "Papan", ["Papan", "Murid", "Buku", "Guru"]),
  lineMatch("section-5-lvl-3", 10, ["-I", "-An", "-Nya", "-Kan"]),
]);

const level4 = defineProblems([
  imagePrompt("section-5-lvl-4", 1, "Makan", ["Makan", "Di-", "Minum", "Pe-"]), imageMultiple("section-5-lvl-4", 2, "Lihat", ["Lihat", "-Nya", "Di-", "Baca"]),
  wordOrder("section-5-lvl-4", 3, ["Makan", "-An"], ["Makan", "-An"], ["Makan", "-An"]),
  imagePrompt("section-5-lvl-4", 4, "Guru", ["Buku", "Murid", "Guru", "Kelas"]), imageMultiple("section-5-lvl-4", 5, "Guru", ["Murid", "Buku", "Kelas", "Guru"]),
  wordOrder("section-5-lvl-4", 6, ["Makan", "-An", "Dan", "Minum", "-Nya"], ["-Nya", "-An", "Minum", "Makan", "Dan"], ["Makan", "-An", "Dan", "Minum", "-Nya"]),
  imagePrompt("section-5-lvl-4", 7, "Murid", ["Buku", "Murid", "Kelas", "Guru"]), imageMultiple("section-5-lvl-4", 8, "Murid", ["Kelas", "Buku", "Murid", "Guru"]),
  wordOrder("section-5-lvl-4", 9, ["Di-", "Baca", "Buku", "-Nya"], ["Di-", "Buku", "Baca", "-Nya"], ["Di-", "Baca", "Buku", "-Nya"]),
  imagePrompt("section-5-lvl-4", 10, "Buku", ["Guru", "Murid", "Kelas", "Buku"]), imageMultiple("section-5-lvl-4", 11, "Buku", ["Murid", "Buku", "Guru", "Kelas"]),
  wordOrder("section-5-lvl-4", 12, ["Aku", "Tidur", "Di-", "Kelas"], ["Tidur", "Aku", "Di-", "Kelas"], ["Aku", "Tidur", "Di-", "Kelas"]),
  imagePrompt("section-5-lvl-4", 13, "Papan", ["Murid", "Guru", "Papan", "Kelas"]), imageMultiple("section-5-lvl-4", 14, "Papan", ["Papan", "Murid", "Buku", "Guru"]),
  wordOrder("section-5-lvl-4", 15, ["Maaf", "Aku", "Tidak", "Me-", "Lihat"], ["Maaf", "Aku", "Tidak", "Me-", "Lihat"], ["Maaf", "Aku", "Tidak", "Me-", "Lihat"]),
]);

export const section5LevelCatalog = {
  "section-5-lvl-1": { id: "section-5-lvl-1", title: "Kegiatan Sehari-hari", description: "Pelajari kosakata dasar kegiatan sehari-hari.", lives: 5, problems: level1 },
  "section-5-lvl-2": { id: "section-5-lvl-2", title: "Imbuhan Awalan", description: "Pelajari imbuhan awalan dalam Bahasa Indonesia.", lives: 5, problems: level2 },
  "section-5-lvl-3": { id: "section-5-lvl-3", title: "Imbuhan Akhiran", description: "Pelajari imbuhan akhiran dan kosakata pendukung.", lives: 5, problems: level3 },
  "section-5-lvl-4": { id: "section-5-lvl-4", title: "Tantangan Kalimat", description: "Uji pemahaman kata dan kalimat dari Act 5.", lives: 5, problems: level4 },
} satisfies Record<string, ScoredLevelDefinition>;
