import type { ComponentType } from "react";

import { OnboardingWelcomeContent } from "~/components/onboarding/onboarding-welcome-content";
import { OnboardingHelpContent } from "~/components/onboarding/onboarding-help-content";

export type OnboardingCaptionLine = {
  text: string;
  textColorClass: "text-ocean" | "text-biru-2" | "text-navy-1" | "text-navy-2" | "text-orange-2" | "text-red-2" | "text-pink-1" | "text-green-2";
};

export type OnboardingContentItem =
  | {
      id: string;
      type: "image";
      assetPath: string;
      alt: string;
      caption?: readonly OnboardingCaptionLine[];
    }
  | {
      id: string;
      type: "component";
      Component: ComponentType;
  };

const STORYBOARD_CAPTIONS: Record<number, readonly OnboardingCaptionLine[]> = {
  1: [{ text: "Dino: *Hmm Aku Bosan...", textColorClass: "text-biru-2" }],
  2: [{ text: "Dino: *Eh Apa Itu?", textColorClass: "text-biru-2" }],
  3: [{ text: "Dino Berenang Kebawah*", textColorClass: "text-orange-2" }],
  4: [{ text: "Menemukan Benda Aneh*", textColorClass: "text-orange-2" }],
  5: [{ text: "Dino: Wow... Gimana Cara Bukanya?", textColorClass: "text-biru-2" }],
  6: [{ text: "Dino: Hore Terbuka*", textColorClass: "text-biru-2" }],
  7: [{ text: "Dino: Gimana Kalau aku bawa?", textColorClass: "text-biru-2" }],
  8: [
    { text: "Dino: Kok Perasaan Ku Ngga Enak Ya?", textColorClass: "text-biru-2" },
    { text: "Orca: *Membuka Mulut", textColorClass: "text-navy-1" },
  ],
  9: [
    { text: "Dino: Huaa Aku Dikejar!!", textColorClass: "text-biru-2" },
    { text: "Orca: Heii! Jangan Pergi", textColorClass: "text-navy-2" },
  ],
  10: [{ text: "Dino: Tolong Aku!!!", textColorClass: "text-biru-2" }],
  11: [{ text: "Dino: *Apa Dia Masih Mengejar?", textColorClass: "text-biru-2" }],
  12: [
    { text: "Dino: Fuh Sudah Aman...", textColorClass: "text-biru-2" },
    { text: "Suara Topan: Ngungg...", textColorClass: "text-red-2" },
  ],
  13: [{ text: "Dino: EH AHHHHH!!!!", textColorClass: "text-biru-2" }],
  14: [{ text: "Apakah... Aku Sudah Mati?", textColorClass: "text-biru-2" }],
  17: [{ text: "Lani: Dinoo, Bangun Yuk? Sudah Siang", textColorClass: "text-pink-1" }],
  18: [
    { text: "Lani: Hee Dino Kenapaa?", textColorClass: "text-pink-1" },
    { text: "Dino: Hiks...", textColorClass: "text-biru-2" },
  ],
  19: [
    { text: "Lani: He Mimpi Buruk Ya?", textColorClass: "text-pink-1" },
    { text: "Dino: Hmm *Masih Setengah Sadar", textColorClass: "text-biru-2" },
  ],
  20: [
    { text: "Kai: BAAA!!", textColorClass: "text-green-2" },
    { text: "Lani: EH Kak Kai?", textColorClass: "text-pink-1" },
  ],
  21: [
    { text: "Lani: Kenapa Kak?", textColorClass: "text-pink-1" },
    { text: "Kai: Aku Lapar :<", textColorClass: "text-green-2" },
  ],
  22: [
    { text: "Lani: IH KAK KAI GELI", textColorClass: "text-pink-1" },
    { text: "Kai: Humm Aku Lapar banget >:(", textColorClass: "text-green-2" },
  ],
};

export const ONBOARDING_CONTENT = [
  ...Array.from({ length: 22 }, (_, index) => {
    const imageNumber = index + 1;

    const caption = STORYBOARD_CAPTIONS[imageNumber];

    return {
      id: `image-${String(imageNumber).padStart(2, "0")}`,
      type: "image" as const,
      assetPath: `onboarding/${imageNumber}.png`,
      alt: `Cerita onboarding SignTide halaman ${imageNumber}`,
      caption,
    };
  }),
  {
    id: "welcome-to-signtide",
    type: "component",
    Component: OnboardingWelcomeContent,
  },
  {
    id: "help-lani-cook",
    type: "component",
    Component: OnboardingHelpContent,
  }
] satisfies readonly OnboardingContentItem[];
