export type LessonStatus = "completed" | "active" | "locked";

export type LessonNodeData = {
  id: string;
  x: number;
  y: number;
  title: string;
  lessonLabel: string;
  xp: number;
  status: LessonStatus;
  icon: string;
  iconAlt: string;
  reward?: {
    name: string;
    image: string;
    alt: string;
    offsetX: number;
    offsetY: number;
    width: number;
    collected: boolean;
  };
};

export type LessonNodeConfig = Omit<LessonNodeData, "status" | "reward"> & {
  available: boolean;
  reward?: Omit<NonNullable<LessonNodeData["reward"]>, "collected">;
};

export type UserProgression = Record<string, Record<string, boolean>>;
export type UserItems = string[];
export type CookedActs = Record<string, boolean>;

export type ActCookingConfig = {
  sectionId: string;
  title: string;
  requiredItems: string[];
  kitchenImage: string;
  kitchenImageAlt: string;
  ingredientAnimation: {
    targetXPercent: number;
    targetYPercent: number;
    entryDistancePx: number;
    entryYOffsetPx: number;
    ingredientSizePx: number;
    staggerSeconds: number;
  };
};

export type ActPrize = {
  name: string;
  title: string;
  image: string;
  alt: string;
};

export type ActDefinition = {
  id: string;
  lessons: LessonNodeConfig[];
  map: ActMapConfig;
  cooking: ActCookingConfig;
  prize: ActPrize;
};

export type ActMapConfig = {
  width: number;
  height: number;
  path: string;
  decorations: MapDecorationData[];
};

export type MapDecorationData = {
  id: string;
  x: number;
  y: number;
  width: number;
  image: string;
  alt: string;
  zIndex?: number;
};
