import type { ActCookingConfig, LessonNodeConfig, MapDecorationData } from "~/models/learning";

export const ACT_ONE_ID = "section-1";

// Array order is the canonical lesson order for this section.
export const actOneLessons: LessonNodeConfig[] = [
  {
    id: "section-1-lvl-1",
    x: 245,
    y: 135,
    title: "Huruf A-E!",
    lessonLabel: "Lesson 1/5",
    xp: 10,
    available: true,
    icon: "/Levels/active.png",
    iconAlt: "Available lesson with sun icon",
    reward: {
      name: "bread",
      image: "/quest/bread.png",
      alt: "Bread reward",
      offsetX: 50,
      offsetY: 36,
      width: 72,
    },
  },
  {
    id: "section-1-lvl-2",
    x: 115,
    y: 330,
    title: "Huruf F-J",
    lessonLabel: "Lesson 2/5",
    xp: 10,
    available: true,
    icon: "/Levels/active.png",
    iconAlt: "Available lesson with sun icon",
  },
  {
    id: "section-1-lvl-3",
    x: 225,
    y: 530,
    title: "Huruf K-O",
    lessonLabel: "Lesson 3/5",
    xp: 10,
    available: true,
    icon: "/Levels/inactive.png",
    iconAlt: "Locked lesson with moon icon",
    reward: {
      name: "veggies",
      image: "/quest/veggies.png",
      alt: "Vegetable reward",
      offsetX: 54,
      offsetY: 42,
      width: 90,
    },
  },
  {
    id: "section-1-lvl-4",
    x: 300,
    y: 720,
    title: "Huruf P-T",
    lessonLabel: "Lesson 4/5",
    xp: 10,
    available: true,
    icon: "/Levels/inactive.png",
    iconAlt: "Locked lesson with moon icon",
  },
  {
    id: "section-1-lvl-5",
    x: 145,
    y: 910,
    title: "Huruf U-Z",
    lessonLabel: "Lesson 5/5",
    xp: 10,
    available: true,
    icon: "/Levels/inactive.png",
    iconAlt: "Locked lesson with moon icon",
    reward: {
      name: "meat",
      image: "/quest/meat.png",
      alt: "Meat reward",
      offsetX: 54,
      offsetY: 42,
      width: 72,
    },
  },
];

export const actOneCooking: ActCookingConfig = {
  sectionId: ACT_ONE_ID,
  requiredItems: actOneLessons.flatMap((lesson) =>
    lesson.reward ? [lesson.reward.name] : [],
  ),
  resultImage: "/quest/sandwich.png",
  resultAlt: "Sandwich yang telah selesai dimasak",
};

export const actOneDecorations: MapDecorationData[] = [
  {
    id: "celebrating-mascot",
    x: 305,
    y: 250,
    width: 180,
    image: "/signtide_character.png",
    alt: "Agus celebrating",
    zIndex: 3,
  },
  {
    id: "waving-mascot",
    x: 84,
    y: 675,
    width: 175,
    image: "/Agus/Agus_2.png",
    alt: "Agus waving",
    zIndex: 2,
  },
];
