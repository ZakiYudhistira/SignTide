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
    image: string;
    alt: string;
    offsetX: number;
    offsetY: number;
    width: number;
  };
};

export type LessonNodeConfig = Omit<LessonNodeData, "status"> & {
  available: boolean;
};

export type UserProgression = Record<string, Record<string, boolean>>;

export type MapDecorationData = {
  id: string;
  x: number;
  y: number;
  width: number;
  image: string;
  alt: string;
  zIndex?: number;
};
