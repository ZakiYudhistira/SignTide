import type { Route } from "./+types/level";
import { data } from "react-router";

import { LearningPage } from "~/components/learning/learning-page";
import { ACT_ONE_ID, actOneLessons } from "~/data/learning/act-one";
import { deriveLessonStatuses } from "~/features/levels/level-progression";
import { getUserProgression } from "~/features/levels/progression.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Level | SignTide" },
    { name: "description", content: "SignTide levels" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { progression, headers } = await getUserProgression(request);

  return data(
    { lessons: deriveLessonStatuses(ACT_ONE_ID, actOneLessons, progression) },
    { headers },
  );
}

export default function LevelRoute({ loaderData }: Route.ComponentProps) {
  return <LearningPage lessons={loaderData.lessons} />;
}
