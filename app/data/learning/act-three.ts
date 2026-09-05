import type { ActCookingFeature, ActMapConfig, LessonNodeConfig } from "~/models/learning";

export const ACT_THREE_ID = "section-3";

export const actThreeLessons: LessonNodeConfig[] = [
  { id: "section-3-lvl-1", x: 205, y: 80, title: "Peralatan Belajar", lessonLabel: "Lesson 1/4", xp: 10, available: true, icon: "/Levels/active.png", iconAlt: "Available lesson" },
  { id: "section-3-lvl-2", x: 145, y: 200, title: "Benda Dalam Kelas", lessonLabel: "Lesson 2/4", xp: 10, available: true, icon: "/Levels/inactive.png", iconAlt: "Locked lesson" },
  { id: "section-3-lvl-3", x: 210, y: 330, title: "Lampu dan Lantai", lessonLabel: "Lesson 3/4", xp: 10, available: true, icon: "/Levels/inactive.png", iconAlt: "Locked lesson" },
  {
    id: "section-3-lvl-4", x: 245, y: 470, title: "Tantangan Kelas", lessonLabel: "Lesson 4/4", xp: 10, available: true, icon: "/Levels/trophy.png", iconAlt: "Final challenge with trophy icon",
    reward: { name: "blueberry", image: "/quest/blueberry.png", alt: "Blueberry reward", offsetX: 55, offsetY: 40, width: 68 },
  },
];

export const actThreeMap: ActMapConfig = {
  width: 390,
  height: 570,
  path: "M205 80 C95 100 260 170 145 200 C45 230 105 305 210 330 C320 355 145 445 245 470",
  decorations: [
    { id: "rini-salad", x: 315, y: 155, width: 180, image: "/Rini/Rini_eat_salad.png", alt: "Rini eating salad", zIndex: 2 },
    { id: "rini-cooking", x: 75, y: 390, width: 250, image: "/Rini/Rini_Cooking.png", alt: "Rini cooking", zIndex: 2 },
  ],
};

export const actThreeCooking: ActCookingFeature = { enabled: false };
