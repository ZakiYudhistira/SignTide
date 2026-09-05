import type { ScoredLevelDefinition } from "../level-catalog.server";
import { defineProblems, imageMultipleProblem, imagePromptProblem, lineMatchProblem, wordOrderProblem } from "./problem-helpers.server";

const prompt = "Isyarat apa yang ditunjukkan?";
const chooseImage = (word: string) => `Pilih gambar untuk kata ${word}.`;
const orderPrompt = "Susun kata menjadi kalimat sederhana yang sesuai dengan gambar.";
const matchPrompt = "Tarik garis gambar dan pasangan kata yang sesuai!";

const level1Problems = defineProblems([
  imagePromptProblem("section-2-lvl-1", 1, "Nama", prompt, ["Nama", "Usia", "Kelas", "Asal"]),
  imageMultipleProblem("section-2-lvl-1", 2, chooseImage("Nama"), "Nama", ["Nama", "Kelas", "Asal", "Usia"]),
  lineMatchProblem("section-2-lvl-1", 3, matchPrompt, ["Nama", "Kelas", "Asal", "Usia"]),
  imagePromptProblem("section-2-lvl-1", 4, "Usia", prompt, ["Nama", "Kelas", "Usia", "Asal"]),
  imageMultipleProblem("section-2-lvl-1", 5, chooseImage("Usia"), "Usia", ["Nama", "Kelas", "Asal", "Usia"]),
  wordOrderProblem("section-2-lvl-1", 6, orderPrompt, ["Nama", "Aku"], ["Nama", "Aku"]),
  imagePromptProblem("section-2-lvl-1", 7, "Kelas", prompt, ["Nama", "Kelas", "Usia", "Asal"]),
  imageMultipleProblem("section-2-lvl-1", 8, chooseImage("Kelas"), "Kelas", ["Nama", "Asal", "Kelas", "Usia"]),
  wordOrderProblem("section-2-lvl-1", 9, orderPrompt, ["Nama", "Dan", "Usia"], ["Nama", "Dan", "Usia"]),
  imagePromptProblem("section-2-lvl-1", 10, "Hobi", prompt, ["Nama", "Kelas", "Usia", "Hobi"]),
  imageMultipleProblem("section-2-lvl-1", 11, chooseImage("Hobi"), "Hobi", ["Nama", "Hobi", "Kelas", "Usia"]),
  wordOrderProblem("section-2-lvl-1", 12, orderPrompt, ["Kelas", "Dan", "Hobi"], ["Kelas", "Dan", "Hobi"]),
  imagePromptProblem("section-2-lvl-1", 13, "Asal", prompt, ["Nama", "Kelas", "Asal", "Hobi"]),
  imageMultipleProblem("section-2-lvl-1", 14, chooseImage("Asal"), "Asal", ["Asal", "Hobi", "Kelas", "Usia"]),
  wordOrderProblem("section-2-lvl-1", 15, orderPrompt, ["Hobi", "Aku"], ["Hobi", "Aku"]),
]);

const level2Problems = defineProblems([
  imagePromptProblem("section-2-lvl-2", 1, "Maaf", prompt, ["Maaf", "Halo", "Tolak", "Salam"]),
  imageMultipleProblem("section-2-lvl-2", 2, chooseImage("Maaf"), "Maaf", ["Maaf", "Salam", "Halo", "Tolak"]),
  wordOrderProblem("section-2-lvl-2", 3, orderPrompt, ["Salam", "Aku"], ["Salam", "Aku"]),
  imagePromptProblem("section-2-lvl-2", 4, "Tolak", prompt, ["Salam", "Maaf", "Tolak", "Halo"]),
  imageMultipleProblem("section-2-lvl-2", 5, chooseImage("Tolak"), "Tolak", ["Maaf", "Halo", "Salam", "Tolak"]),
  wordOrderProblem("section-2-lvl-2", 6, orderPrompt, ["Maaf", "Dan", "Salam"], ["Maaf", "Dan", "Salam"]),
  imagePromptProblem("section-2-lvl-2", 7, "Salam", prompt, ["Tolak", "Salam", "Maaf", "Halo"]),
  imageMultipleProblem("section-2-lvl-2", 8, chooseImage("Salam"), "Salam", ["Terima Kasih", "Halo", "Salam", "Tolak"]),
  wordOrderProblem("section-2-lvl-2", 9, orderPrompt, ["Maaf", "Dan", "Terima Kasih"], ["Maaf", "Dan", "Terima Kasih"]),
  imagePromptProblem("section-2-lvl-2", 10, "Halo", prompt, ["Tolak", "Terima Kasih", "Salam", "Halo"]),
  imageMultipleProblem("section-2-lvl-2", 11, chooseImage("Halo"), "Halo", ["Tolak", "Halo", "Terima Kasih", "Salam"]),
  wordOrderProblem("section-2-lvl-2", 12, orderPrompt, ["Halo", "Nama", "Aku"], ["Halo", "Nama", "Aku"]),
  imagePromptProblem("section-2-lvl-2", 13, "Terima Kasih", prompt, ["Halo", "Salam", "Terima Kasih", "Tolak"]),
  imageMultipleProblem("section-2-lvl-2", 14, chooseImage("Terima Kasih"), "Terima Kasih", ["Terima Kasih", "Tolak", "Salam", "Halo"]),
  lineMatchProblem("section-2-lvl-2", 15, matchPrompt, ["Maaf", "Salam", "Terima Kasih", "Halo", "Tolak"]),
]);

const level3Problems = defineProblems([
  imagePromptProblem("section-2-lvl-3", 1, "Kursi", prompt, ["Kursi", "Papan", "Meja", "Tas"]),
  imageMultipleProblem("section-2-lvl-3", 2, chooseImage("Kursi"), "Kursi", ["Kursi", "Meja", "Tas", "Papan"]),
  imagePromptProblem("section-2-lvl-3", 3, "Papan", prompt, ["Tas", "Meja", "Papan", "Kursi"]),
  imageMultipleProblem("section-2-lvl-3", 4, chooseImage("Papan"), "Papan", ["Tas", "Meja", "Kursi", "Papan"]),
  wordOrderProblem("section-2-lvl-3", 5, orderPrompt, ["Buku", "Aku"], ["Buku", "Aku"]),
  imagePromptProblem("section-2-lvl-3", 6, "Meja", prompt, ["Papan", "Meja", "Kursi", "Tas"]),
  imageMultipleProblem("section-2-lvl-3", 7, chooseImage("Meja"), "Meja", ["Kursi", "Papan", "Meja", "Tas"]),
  wordOrderProblem("section-2-lvl-3", 8, orderPrompt, ["Meja", "Dan", "Papan"], ["Meja", "Dan", "Papan"]),
  imagePromptProblem("section-2-lvl-3", 9, "Tas", prompt, ["Meja", "Kursi", "Papan", "Tas"]),
  imageMultipleProblem("section-2-lvl-3", 10, chooseImage("Tas"), "Tas", ["Papan", "Tas", "Meja", "Kursi"]),
  wordOrderProblem("section-2-lvl-3", 11, orderPrompt, ["Kursi", "Aku"], ["Kursi", "Aku"]),
  imagePromptProblem("section-2-lvl-3", 12, "Buku", prompt, ["Papan", "Kursi", "Buku", "Tas"]),
  imageMultipleProblem("section-2-lvl-3", 13, chooseImage("Buku"), "Buku", ["Buku", "Kursi", "Meja", "Papan"]),
  lineMatchProblem("section-2-lvl-3", 14, matchPrompt, ["Kursi", "Papan", "Meja", "Buku", "Tas"]),
]);

const level4Problems = defineProblems([
  imagePromptProblem("section-2-lvl-4", 1, "Kelas", prompt, ["Kelas", "Guru", "Murid", "Buku"]),
  imageMultipleProblem("section-2-lvl-4", 2, chooseImage("Kelas"), "Kelas", ["Kelas", "Murid", "Buku", "Guru"]),
  imagePromptProblem("section-2-lvl-4", 3, "Guru", prompt, ["Buku", "Murid", "Guru", "Kelas"]),
  imageMultipleProblem("section-2-lvl-4", 4, chooseImage("Guru"), "Guru", ["Murid", "Buku", "Kelas", "Guru"]),
  imagePromptProblem("section-2-lvl-4", 5, "Murid", prompt, ["Buku", "Murid", "Kelas", "Guru"]),
  imageMultipleProblem("section-2-lvl-4", 6, chooseImage("Murid"), "Murid", ["Kelas", "Buku", "Murid", "Guru"]),
  imagePromptProblem("section-2-lvl-4", 7, "Buku", prompt, ["Guru", "Murid", "Kelas", "Buku"]),
  imageMultipleProblem("section-2-lvl-4", 8, chooseImage("Buku"), "Buku", ["Murid", "Buku", "Guru", "Kelas"]),
  imagePromptProblem("section-2-lvl-4", 9, "Papan", prompt, ["Murid", "Guru", "Papan", "Kelas"]),
  imageMultipleProblem("section-2-lvl-4", 10, chooseImage("Papan"), "Papan", ["Papan", "Murid", "Guru", "Buku"]),
  lineMatchProblem("section-2-lvl-4", 11, matchPrompt, ["Murid", "Kelas", "Guru", "Buku", "Papan"]),
]);

const level5Problems = defineProblems([
  imagePromptProblem("section-2-lvl-5", 1, "Nama", prompt, ["Nama", "Kelas", "Papan", "Salam"]),
  imageMultipleProblem("section-2-lvl-5", 2, chooseImage("Halo"), "Halo", ["Halo", "Tas", "Usia", "Kelas"]),
  wordOrderProblem("section-2-lvl-5", 3, orderPrompt, ["Halo", "Nama", "Aku"], ["Halo", "Nama", "Aku"]),
  imagePromptProblem("section-2-lvl-5", 4, "Guru", prompt, ["Buku", "Murid", "Guru", "Kelas"]),
  imageMultipleProblem("section-2-lvl-5", 5, chooseImage("Meja"), "Meja", ["Murid", "Buku", "Kelas", "Meja"]),
  wordOrderProblem("section-2-lvl-5", 6, orderPrompt, ["Maaf", "Dan", "Terima Kasih"], ["Maaf", "Dan", "Terima Kasih"]),
  imagePromptProblem("section-2-lvl-5", 7, "Asal", prompt, ["Hobi", "Asal", "Kelas", "Terima Kasih"]),
  imageMultipleProblem("section-2-lvl-5", 8, chooseImage("Hobi"), "Hobi", ["Papan", "Tas", "Hobi", "Murid"]),
  wordOrderProblem("section-2-lvl-5", 9, orderPrompt, ["Maaf", "Dan", "Terima Kasih"], ["Maaf", "Dan", "Terima Kasih"]),
  imagePromptProblem("section-2-lvl-5", 10, "Tolak", prompt, ["Terima Kasih", "Buku", "Salam", "Tolak"]),
  imageMultipleProblem("section-2-lvl-5", 11, chooseImage("Maaf"), "Maaf", ["Kursi", "Maaf", "Halo", "Asal"]),
  wordOrderProblem("section-2-lvl-5", 12, orderPrompt, ["Meja", "Dan", "Papan"], ["Meja", "Dan", "Papan"]),
  imagePromptProblem("section-2-lvl-5", 13, "Papan", prompt, ["Murid", "Guru", "Papan", "Kelas"]),
  imageMultipleProblem("section-2-lvl-5", 14, chooseImage("Terima Kasih"), "Terima Kasih", ["Terima Kasih", "Kelas", "Asal", "Guru"]),
  lineMatchProblem("section-2-lvl-5", 15, matchPrompt, ["Kelas", "Guru", "Asal", "Tas"]),
]);

export const section2LevelCatalog = {
  "section-2-lvl-1": { id: "section-2-lvl-1", title: "Tentang Diriku", description: "Pelajari nama, usia, kelas, asal, dan hobi.", lives: 5, problems: level1Problems },
  "section-2-lvl-2": { id: "section-2-lvl-2", title: "Salam dan Sapaan", description: "Pelajari salam, sapaan, dan ungkapan sopan.", lives: 5, problems: level2Problems },
  "section-2-lvl-3": { id: "section-2-lvl-3", title: "Barang Dalam Kelas", description: "Kenali benda-benda yang ada di dalam kelas.", lives: 5, reward: { name: "yoghurt" }, problems: level3Problems },
  "section-2-lvl-4": { id: "section-2-lvl-4", title: "Orang Dalam Kelas", description: "Pelajari kosakata kelas, guru, murid, buku, dan papan.", lives: 5, problems: level4Problems },
  "section-2-lvl-5": { id: "section-2-lvl-5", title: "Tantangan Perkenalan", description: "Uji pemahaman seluruh kosakata Act 2.", lives: 5, problems: level5Problems },
} satisfies Record<string, ScoredLevelDefinition>;
