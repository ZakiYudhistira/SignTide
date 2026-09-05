import type { Route } from "./+types/debug-sequence-problem";

import { ImageSequenceOrderProblemView } from "~/components/levels/image-sequence-order-problem";
import {
  getDebugSequenceProblem,
  validateDebugSequenceAnswer,
} from "~/data/levels/debug-sequence-problem.server";

export function loader() {
  return { problem: getDebugSequenceProblem() };
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

  if (!Array.isArray(answer) || !answer.every((word) => typeof word === "string")) {
    throw new Response("Invalid answer", { status: 400 });
  }

  return validateDebugSequenceAnswer(answer);
}

export function meta() {
  return [{ title: "Sequence Problem Debug | SignTide" }];
}

export default function DebugSequenceProblemRoute({ loaderData }: Route.ComponentProps) {
  return <ImageSequenceOrderProblemView problem={loaderData.problem} />;
}
