import type { Route } from "./+types/level";
import { data } from "react-router";

import { LearningPage } from "~/components/learning/learning-page";
import { registeredActs } from "~/data/learning/act-catalog";
import { deriveActAccess, deriveLessonStatuses } from "~/features/levels/level-progression";
import { getUserProgression } from "~/features/levels/progression.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Level | SignTide" },
    { name: "description", content: "SignTide levels" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { progression, items, cookedActs, headers } = await getUserProgression(
    request,
    { allowAnonymous: true },
  );
  const actAccess = deriveActAccess(registeredActs, progression);

  return data(
    {
      sections: registeredActs.map((act) => ({
        id: act.id,
        label: act.label,
        title: act.title,
        titleColor: act.titleColor,
        nextSectionLabel: act.nextSectionLabel,
        lessons: deriveLessonStatuses(
          act.id,
          act.lessons,
          progression,
          items,
          actAccess[act.id],
        ),
        map: act.map,
        cooking: act.cooking,
        cooked: act.cooking.enabled && cookedActs[act.id] === true,
        isUnlocked: actAccess[act.id],
      })),
    },
    { headers },
  );
}

export default function LevelRoute({ loaderData }: Route.ComponentProps) {
  return <LearningPage sections={loaderData.sections} />;
}
