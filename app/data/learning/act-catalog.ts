import type { ActDefinition } from "~/models/learning";

import { ACT_ONE_ID, actOneCooking, actOneLessons, actOneMap, actOnePrize } from "./act-one";
import { ACT_TWO_ID, actTwoCooking, actTwoLessons, actTwoMap } from "./act-two";
import { ACT_THREE_ID, actThreeCooking, actThreeLessons, actThreeMap } from "./act-three";
import { ACT_FOUR_ID, actFourCooking, actFourLessons, actFourMap, actFourPrize } from "./act-four";
import { ACT_FIVE_ID, actFiveCooking, actFiveLessons, actFiveMap } from "./act-five";

export const actCatalog = {
  [ACT_ONE_ID]: {
    id: ACT_ONE_ID,
    label: "Act 1",
    title: "Alfabet Dasar!",
    titleColor: "#76bce9",
    nextSectionLabel: "Kata Dasar",
    lessons: actOneLessons,
    map: actOneMap,
    cooking: {
      enabled: true,
      config: actOneCooking,
      prize: actOnePrize,
    },
  },
  [ACT_TWO_ID]: {
    id: ACT_TWO_ID,
    label: "Act 2",
    title: "Perkenalkan Dirimu!",
    titleColor: "#ff9400",
    nextSectionLabel: "Barang Dalam Kelas",
    lessons: actTwoLessons,
    map: actTwoMap,
    cooking: actTwoCooking,
  },
  [ACT_THREE_ID]: {
    id: ACT_THREE_ID,
    label: "Act 3",
    title: "Barang-Barang Dalam Kelas!",
    titleColor: "#8ee000",
    nextSectionLabel: "Meminta Pertolongan",
    lessons: actThreeLessons,
    map: actThreeMap,
    cooking: actThreeCooking,
  },
  [ACT_FOUR_ID]: {
    id: ACT_FOUR_ID,
    label: "Act 4",
    title: "Guru, Aku Perlu Bantuan Mu!",
    titleColor: "#ff77c5",
    nextSectionLabel: "Apakah Kamu Sudah Siap?",
    lessons: actFourLessons,
    map: actFourMap,
    cooking: {
      enabled: true,
      config: actFourCooking,
      prize: actFourPrize,
    },
  },
  [ACT_FIVE_ID]: {
    id: ACT_FIVE_ID,
    label: "Act 5",
    title: "Kalimat Sehari-Hari!",
    titleColor: "#76bce9",
    nextSectionLabel: "Sampai Jumpa!",
    lessons: actFiveLessons,
    map: actFiveMap,
    cooking: actFiveCooking,
  },
} satisfies Record<string, ActDefinition>;

export type ActIdentifier = keyof typeof actCatalog;

export const registeredActs: readonly ActDefinition[] = Object.values(actCatalog);

export function getActByIdentifier(identifier: string): ActDefinition | null {
  return identifier in actCatalog
    ? actCatalog[identifier as ActIdentifier]
    : null;
}

export function getDefaultAct(): ActDefinition {
  const act = registeredActs[0];

  if (!act) {
    throw new Error("At least one act must be registered in actCatalog.");
  }

  return act;
}

export function getActByLevelIdentifier(levelId: string): ActDefinition | null {
  return registeredActs.find((act) =>
    act.lessons.some((lesson) => lesson.id === levelId),
  ) ?? null;
}
