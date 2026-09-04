import { data, isRouteErrorResponse, useRouteError } from "react-router";

import type { Route } from "./+types/level-session";

import { LevelNotFound } from "~/components/levels/level-not-found";
import { LevelPage } from "~/components/levels/level-page";
import { LevelSummary } from "~/components/levels/level-summary";
import {
  getPublicLevelByIdentifier,
  getLevelRewardName,
  gradeLevelProblem,
  validateLevelAnswers,
  type SubmittedAnswers,
} from "~/features/levels/level-session.server";
import type { LevelActionData } from "~/models/level";
import { getActByLevelIdentifier, registeredActs } from "~/data/learning/act-catalog";
import {
  canAccessAct,
  canAccessLesson,
  deriveLessonStatuses,
} from "~/features/levels/level-progression";
import {
  getUserProgression,
  markLevelCompleted,
} from "~/features/levels/progression.server";

function parseSubmittedAnswers(value: FormDataEntryValue | null): SubmittedAnswers | null {
  if (typeof value !== "string") return null;

  try {
    const parsed: unknown = JSON.parse(value);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }

    const entries = Object.entries(parsed);

    return entries.every(
      ([problemId, choiceId]) => problemId.length > 0 && typeof choiceId === "string",
    )
      ? Object.fromEntries(entries) as SubmittedAnswers
      : null;
  } catch {
    return null;
  }
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const level = getPublicLevelByIdentifier(params.levelId);
  const act = getActByLevelIdentifier(params.levelId);

  if (!level || !act) {
    throw new Response("Level not found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const { progression, headers } = await getUserProgression(request);

  if (!canAccessAct(act.id, registeredActs, progression)) {
    throw new Response(null, {
      status: 302,
      headers: { Location: `/level#${encodeURIComponent(act.id)}`, ...Object.fromEntries(headers) },
    });
  }

  const lessons = deriveLessonStatuses(act.id, act.lessons, progression);

  if (!canAccessLesson(params.levelId, lessons)) {
    throw new Response(null, {
      status: 302,
      headers: { Location: `/level#${encodeURIComponent(act.id)}`, ...Object.fromEntries(headers) },
    });
  }

  return data({
    level,
    reward: act.lessons.find((lesson) => lesson.id === params.levelId)?.reward,
    returnTo: `/level#${encodeURIComponent(act.id)}`,
  }, { headers });
}

export async function action({ request, params }: Route.ActionArgs) {
  const act = getActByLevelIdentifier(params.levelId);

  if (!act) {
    throw new Response("Level not found", { status: 404, statusText: "Not Found" });
  }

  const formData = await request.formData();
  const intent = formData.get("_intent");

  const { progression, headers } = await getUserProgression(request);

  if (!canAccessAct(act.id, registeredActs, progression)) {
    throw new Response(null, {
      status: 302,
      headers: { Location: `/level#${encodeURIComponent(act.id)}`, ...Object.fromEntries(headers) },
    });
  }

  const lessons = deriveLessonStatuses(act.id, act.lessons, progression);

  if (!canAccessLesson(params.levelId, lessons)) {
    throw new Response(null, {
      status: 302,
      headers: { Location: `/level#${encodeURIComponent(act.id)}`, ...Object.fromEntries(headers) },
    });
  }

  if (intent === "grade-problem") {
    const problemId = formData.get("problemId");
    const choiceId = formData.get("choiceId");

    if (typeof problemId !== "string" || typeof choiceId !== "string") {
      throw new Response("Invalid problem answer", { status: 400 });
    }

    const grade = gradeLevelProblem(params.levelId, problemId, choiceId);

    if (!grade) {
      throw new Response("Invalid problem answer", { status: 400 });
    }

    return data<LevelActionData>(
      { intent: "grade-problem", grade },
      { headers },
    );
  }

  if (intent !== "finish-level") {
    throw new Response("Invalid level action", { status: 400 });
  }

  const answers = parseSubmittedAnswers(formData.get("answers"));

  if (!answers) {
    throw new Response("Invalid level answers", {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const result = validateLevelAnswers(params.levelId, answers);

  if (!result) {
    throw new Response("Level not found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  if (result.score === result.total) {
    const completion = await markLevelCompleted(
      request,
      act.id,
      params.levelId,
      getLevelRewardName(params.levelId),
    );
    return data(
      {
        intent: "finish-level",
        result: { ...result, xpAwarded: completion.xpAwarded },
      } satisfies LevelActionData,
      { headers: completion.headers },
    );
  }

  return data<LevelActionData>(
    { intent: "finish-level", result },
    { headers },
  );
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: `${loaderData?.level.title ?? "Level"} | SignTide` },
    {
      name: "description",
      content: loaderData?.level.description ?? "SignTide learning level",
    },
  ];
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <LevelNotFound />;
  }

  throw error;
}

export default function LevelSessionRoute({ loaderData, actionData }: Route.ComponentProps) {
  if (actionData?.intent === "finish-level") {
    return <LevelSummary result={actionData.result} reward={loaderData.reward} returnTo={loaderData.returnTo} />;
  }

  return <LevelPage level={loaderData.level} returnTo={loaderData.returnTo} />;
}
