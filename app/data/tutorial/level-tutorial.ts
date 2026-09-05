export type TutorialPlacement = "above" | "below";

export type TutorialStep = {
  id: string;
  target: string;
  title: string;
  description: string;
  placement: TutorialPlacement;
  spotlightPadding?: number;
};

export const LEVEL_TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: "levels",
    target: "levels",
    title: "Selesaikan Level",
    description:
      "Tekan level untuk mulai belajar. Selesaikan setiap level untuk mencari dan mengumpulkan bahan makanan.",
    placement: "below",
    spotlightPadding: 8,
  },
  {
    id: "belajar",
    target: "nav-belajar",
    title: "Belajar",
    description:
      "Buka peta belajar, lanjutkan level, dan lihat bahan makanan yang sudah kamu temukan.",
    placement: "above",
    spotlightPadding: 4,
  },
  {
    id: "kamus",
    target: "nav-kamus",
    title: "Kamus",
    description:
      "Buka Kamus untuk melihat kembali kosakata bahasa isyarat yang tersedia.",
    placement: "above",
    spotlightPadding: 4,
  },
  {
    id: "peringkat",
    target: "nav-peringkat",
    title: "Peringkat",
    description:
      "Lihat Peringkat untuk membandingkan pencapaian belajarmu dengan pemain lain.",
    placement: "above",
    spotlightPadding: 4,
  },
];
