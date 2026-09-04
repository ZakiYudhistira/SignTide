import type { ActDefinition } from "~/models/learning";

import { ACT_ONE_ID, actOneCooking, actOneLessons, actOnePrize } from "./act-one";

export const actCatalog = {
  [ACT_ONE_ID]: {
    id: ACT_ONE_ID,
    lessons: actOneLessons,
    cooking: actOneCooking,
    prize: actOnePrize,
  },
} satisfies Record<string, ActDefinition>;

export type ActIdentifier = keyof typeof actCatalog;

export function getActByIdentifier(identifier: string): ActDefinition | null {
  return identifier in actCatalog
    ? actCatalog[identifier as ActIdentifier]
    : null;
}
