import type { Route } from "./+types/debug-line-match-problem";

import { LineMatchProblemView } from "~/components/levels/line-match-problem";
import {
  getDebugLineMatchProblem,
  validateDebugLineMatchAnswer,
} from "~/data/levels/debug-line-match-problem.server";
import type { LineMatchPair } from "~/models/level";

function isLineMatchAnswer(value: unknown): value is LineMatchPair[] {
  return Array.isArray(value) && value.every(
    (pair) =>
      pair !== null &&
      typeof pair === "object" &&
      !Array.isArray(pair) &&
      typeof (pair as Record<string, unknown>).imageId === "string" &&
      typeof (pair as Record<string, unknown>).answerId === "string",
  );
}

export function loader() {
  return { problem: getDebugLineMatchProblem() };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const rawAnswer = formData.get("answer");
  if (typeof rawAnswer !== "string") {
    throw new Response("Invalid answer", { status: 400 });
  }

  let answer: unknown;
  try {
    answer = JSON.parse(rawAnswer);
  } catch {
    throw new Response("Invalid answer", { status: 400 });
  }

  if (!isLineMatchAnswer(answer)) {
    throw new Response("Invalid answer", { status: 400 });
  }

  return validateDebugLineMatchAnswer(answer);
}

export function meta() {
  return [{ title: "Line Match Problem Debug | SignTide" }];
}

export default function DebugLineMatchProblemRoute({ loaderData }: Route.ComponentProps) {
  return <LineMatchProblemView problem={loaderData.problem} />;
}
