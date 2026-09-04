import type { Route } from "./+types/level";
import { data } from "react-router";

import { LearningPage } from "~/components/learning/learning-page";
import { ACT_ONE_ID, actOneCooking, actOneLessons } from "~/data/learning/act-one";
import { deriveLessonStatuses } from "~/features/levels/level-progression";
import { cookAct, getUserProgression } from "~/features/levels/progression.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Level | SignTide" },
    { name: "description", content: "SignTide levels" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { progression, items, headers } = await getUserProgression(
    request,
    { allowAnonymous: true },
  );

  return data(
    {
      lessons: deriveLessonStatuses(ACT_ONE_ID, actOneLessons, progression, items),
      cooking: actOneCooking,
    },
    { headers },
  );
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  if (formData.get("_intent") !== "cook") {
    throw new Response("Invalid action", { status: 400 });
  }

  const result = await cookAct(request, actOneCooking);
  return data({ cooked: result.cooked }, { headers: result.headers });
}

export default function LevelRoute({ loaderData }: Route.ComponentProps) {
  return (
    <LearningPage
      lessons={loaderData.lessons}
      cooking={loaderData.cooking}
    />
  );
}
