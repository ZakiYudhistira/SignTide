import type { ActCookingFeature, ActMapConfig, LessonNodeConfig } from "~/models/learning";

export const ACT_FIVE_ID = "section-5";

export const actFiveLessons: LessonNodeConfig[] = [
  {
    id: "section-5-lvl-1",
    x: 240,
    y: 90,
    title: "Kalimat Sapaan",
    lessonLabel: "Lesson 1/4",
    xp: 10,
    available: true,
    icon: "/Levels/active.png",
    iconAlt: "Available lesson",
  },
  {
    id: "section-5-lvl-2",
    x: 125,
    y: 245,
    title: "Kalimat Aktivitas",
    lessonLabel: "Lesson 2/4",
    xp: 10,
    available: true,
    icon: "/Levels/inactive.png",
    iconAlt: "Locked lesson",
  },
  {
    id: "section-5-lvl-3",
    x: 245,
    y: 410,
    title: "Kalimat Sehari-Hari",
    lessonLabel: "Lesson 3/4",
    xp: 10,
    available: true,
    icon: "/Levels/inactive.png",
    iconAlt: "Locked lesson",
  },
  {
    id: "section-5-lvl-4",
    x: 150,
    y: 575,
    title: "Tantangan Kalimat",
    lessonLabel: "Lesson 4/4",
    xp: 10,
    available: true,
    icon: "/Levels/trophy.png",
    iconAlt: "Final challenge with trophy icon",
  },
];

export const actFiveMap: ActMapConfig = {
  width: 390,
  height: 670,
  path: "M240 90 C105 115 300 195 125 245 C25 290 95 360 245 410 C355 455 300 535 150 575",
  decorations: [
    {
      id: "act-five-mascot",
      x: 310,
      y: 225,
      width: 190,
      image: "/signtide_character.png",
      alt: "SignTide mascot celebrating",
      zIndex: 2,
    },
    {
      id: "act-five-orca",
      x: 75,
      y: 470,
      width: 180,
      image: "/orca.png",
      alt: "Orca mascot",
      zIndex: 2,
    },
  ],
};

export const actFiveCooking: ActCookingFeature = { enabled: false };
