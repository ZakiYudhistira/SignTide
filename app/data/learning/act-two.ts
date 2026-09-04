import type { ActCookingFeature, ActMapConfig, LessonNodeConfig } from "~/models/learning";

export const ACT_TWO_ID = "section-2";

export const actTwoLessons: LessonNodeConfig[] = [
  { id: "section-2-lvl-1", x: 185, y: 90, title: "Salam", lessonLabel: "Lesson 1/5", xp: 10, available: true, icon: "/Levels/active.png", iconAlt: "Available lesson" },
  { id: "section-2-lvl-2", x: 235, y: 230, title: "Namaku", lessonLabel: "Lesson 2/5", xp: 10, available: true, icon: "/Levels/inactive.png", iconAlt: "Locked lesson" },
  {
    id: "section-2-lvl-3", x: 170, y: 370, title: "Tentang Aku", lessonLabel: "Lesson 3/5", xp: 10, available: true, icon: "/Levels/inactive.png", iconAlt: "Locked lesson",
    reward: { name: "yoghurt", image: "/quest/yoghurt.png", alt: "Yoghurt reward", offsetX: 55, offsetY: 40, width: 64 },
  },
  { id: "section-2-lvl-4", x: 130, y: 510, title: "Kesukaanku", lessonLabel: "Lesson 4/5", xp: 10, available: true, icon: "/Levels/inactive.png", iconAlt: "Locked lesson" },
  { id: "section-2-lvl-5", x: 195, y: 660, title: "Tantangan Perkenalan", lessonLabel: "Lesson 5/5", xp: 10, available: true, icon: "/Levels/trophy.png", iconAlt: "Final challenge with trophy icon" },
];

export const actTwoMap: ActMapConfig = {
  width: 390,
  height: 760,
  path: "M185 90 C285 110 280 205 235 230 C190 255 75 315 170 370 C275 430 205 480 130 510 C45 545 85 630 195 660",
  decorations: [
    { id: "brown-room", x: 75, y: 225, width: 250, image: "/section_sprites/s2_brown_room.png", alt: "Brown room", zIndex: 2 },
    { id: "xavier-surfing", x: 325, y: 525, width: 220, image: "/Xavier/Xavier_Surfing.png", alt: "Xavier surfing", zIndex: 2 },
  ],
};

export const actTwoCooking: ActCookingFeature = {
  enabled: false,
};
