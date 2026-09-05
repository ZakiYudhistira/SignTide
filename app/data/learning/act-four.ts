import type { ActCookingConfig, ActMapConfig, ActPrize, LessonNodeConfig } from "~/models/learning";

export const ACT_FOUR_ID = "section-4";

export const actFourLessons: LessonNodeConfig[] = [
  {
    id: "section-4-lvl-1", x: 145, y: 110, title: "Meminta Bantuan", lessonLabel: "Lesson 1/3", xp: 10, available: true, icon: "/Levels/active.png", iconAlt: "Available lesson",
  },
  {
    id: "section-4-lvl-2", x: 275, y: 330, title: "Tidak Paham", lessonLabel: "Lesson 2/3", xp: 10, available: true, icon: "/Levels/inactive.png", iconAlt: "Locked lesson",
  },
  {
    id: "section-4-lvl-3", x: 145, y: 565, title: "Tantangan Bantuan", lessonLabel: "Lesson 3/3", xp: 10, available: true, icon: "/Levels/trophy.png", iconAlt: "Final challenge with trophy icon",
    reward: { name: "banana", image: "/quest/banana.png", alt: "Banana reward", offsetX: 55, offsetY: 40, width: 72 },
  },
];

export const actFourMap: ActMapConfig = {
  width: 390,
  height: 700,
  path: "M145 110 C145 215 325 220 275 330 C220 445 80 450 145 565",
  decorations: [
    { id: "tina-volley", x: 70, y: 300, width: 155, image: "/Tina/Tina_volley.png", alt: "Tina playing volleyball", zIndex: 2 },
    { id: "pink-room", x: 300, y: 590, width: 175, image: "/section_sprites/s4_pink_room.png", alt: "Pink room", zIndex: 2 },
  ],
};

export const actFourCooking: ActCookingConfig = {
  sectionId: ACT_FOUR_ID,
  title: "Dapur",
  requiredItems: ["yoghurt", "blueberry", "banana"],
  kitchenImage: "/quest/kompor.png",
  kitchenImageAlt: "Kompor dan panci untuk membuat yoghurt buah",
  ingredientAnimation: { targetXPercent: 50, targetYPercent: 13, entryDistancePx: 155, entryYOffsetPx: -45, ingredientSizePx: 80, staggerSeconds: 0.5 },
};

export const actFourPrize: ActPrize = {
  name: "fruit-yoghurt",
  title: "Yoghurt Buah!",
  image: "/quest/yoghurt.png",
  alt: "Yoghurt buah yang telah selesai dibuat",
};
