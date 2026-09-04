import type { ActMapConfig } from "~/models/learning";

export const ACT_TWO_ID = "section-2";

// Placeholder geometry for Act 2. Its lessons can use their own x/y positions
// against this coordinate system without changing the SkillMap component.
export const actTwoMap: ActMapConfig = {
  width: 390,
  height: 1050,
  path: "M120 110 C300 170 315 260 155 315 C25 370 65 470 245 520 C370 565 330 680 150 725 C30 775 85 900 270 955",
  decorations: [],
};
