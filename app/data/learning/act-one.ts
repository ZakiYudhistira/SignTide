import type { ActCookingConfig, ActMapConfig, ActPrize, LessonNodeConfig, MapDecorationData } from "~/models/learning";

export const ACT_ONE_ID = "section-1";

// Array order is the canonical lesson order for this section.
export const actOneLessons: LessonNodeConfig[] = [
  {
    id: "section-1-lvl-1",
    x: 245,
    y: 120,
    title: "Huruf A-E!",
    lessonLabel: "Lesson 1/6",
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
    y: 290,
    title: "Huruf F-J",
    lessonLabel: "Lesson 2/6",
    xp: 10,
    available: true,
    icon: "/Levels/active.png",
    iconAlt: "Available lesson with sun icon",
  },
  {
    id: "section-1-lvl-3",
    x: 250,
    y: 460,
    title: "Huruf K-O",
    lessonLabel: "Lesson 3/6",
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
    x: 120,
    y: 630,
    title: "Huruf P-T",
    lessonLabel: "Lesson 4/6",
    xp: 10,
    available: true,
    icon: "/Levels/inactive.png",
    iconAlt: "Locked lesson with moon icon",
  },
  {
    id: "section-1-lvl-5",
    x: 270,
    y: 800,
    title: "Huruf U-Z",
    lessonLabel: "Lesson 5/6",
    xp: 10,
    available: true,
    icon: "/Levels/inactive.png",
    iconAlt: "Locked lesson with moon icon",
  },
  {
    id: "section-1-lvl-6",
    x: 145,
    y: 970,
    title: "Tantangan Akhir",
    lessonLabel: "Lesson 6/6",
    xp: 10,
    available: true,
    icon: "/Levels/trophy.png",
    iconAlt: "Final challenge with trophy icon",
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
  title: "Dapur",
  requiredItems: actOneLessons.flatMap((lesson) =>
    lesson.reward ? [lesson.reward.name] : [],
  ),
  kitchenImage: "/quest/kompor.png",
  kitchenImageAlt: "Kompor dan panci untuk memasak",
  ingredientAnimation: {
    targetXPercent: 50,
    targetYPercent: 13,
    entryDistancePx: 155,
    entryYOffsetPx: -45,
    ingredientSizePx: 80,
    staggerSeconds: 0.5,
  },
};

export const actOnePrize: ActPrize = {
  name: "sandwich",
  title: "Roti Lapis Sourdough!",
  image: "/quest/sandwich.png",
  alt: "Roti lapis sourdough yang telah selesai dimasak",
};

export const actOneDecorations: MapDecorationData[] = [
  {
    id: "celebrating-mascot",
    x: 305,
    y: 250,
    width: 220,
    image: "/signtide_character.png",
    alt: "Agus celebrating",
    zIndex: 3,
  },
  {
    id: "waving-mascot",
    x: 84,
    y: 800,
    width: 175,
    image: "/Agus/Agus_2.png",
    alt: "Agus waving",
    zIndex: 2,
  },
];

export const actOneMap: ActMapConfig = {
  width: 390,
  height: 1050,
  path: "M245 120 C130 145 285 230 115 290 C15 335 90 410 250 460 C370 505 300 585 120 630 C15 680 105 755 270 800 C370 850 305 925 145 970",
  decorations: actOneDecorations,
};
