import type {
  ScoredLineMatchProblem,
  ScoredSignToWordOrderProblem,
} from "../level-catalog.server";
import { learningAssetUrl } from "~/utils/learning-asset.server";

export const sectionFiveAdvancedProblems: [
  ScoredSignToWordOrderProblem,
  ScoredLineMatchProblem,
] = [
  {
    id: "section-5-lvl-1-sequence-1",
    type: "sign-to-word-order",
    eyebrow: "SUSUN KALIMAT",
    prompt: "Susun terjemahan dari isyarat berikut!",
    mascot: {
      image: "/signtide_character.png",
      alt: "Maskot SignTide memberi petunjuk",
    },
    imageOrder: [
      {
        kind: "image",
        src: learningAssetUrl("kata/Aku.png"),
        alt: "Isyarat untuk kata Aku",
      },
      {
        kind: "image",
        src: learningAssetUrl("kata/TidakPaham.png"),
        alt: "Isyarat untuk kata Tidak Paham",
      },
    ],
    wordChoices: ["Paham", "Aku", "Tidak"],
    answer: ["Aku", "Tidak", "Paham"],
  },
  {
    id: "section-5-lvl-1-line-match-1",
    type: "line-match",
    prompt: "Hubungkan gambar dengan huruf yang benar!",
    images: ["A", "B", "C", "D", "E"].map((letter) => ({
      id: `sign-${letter.toLowerCase()}`,
      visual: {
        kind: "image" as const,
        src: learningAssetUrl(`alphabet/SIBI_${letter}.png`),
        alt: `Isyarat untuk huruf ${letter}`,
      },
    })),
    answers: ["C", "A", "E", "B", "D"].map((letter) => ({
      id: `letter-${letter.toLowerCase()}`,
      label: letter,
    })),
    answer: ["A", "B", "C", "D", "E"].map((letter) => ({
      imageId: `sign-${letter.toLowerCase()}`,
      answerId: `letter-${letter.toLowerCase()}`,
    })),
  },
];
