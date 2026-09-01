import { data } from "react-router";

import type { UserProgression } from "~/models/learning";
import { createClient } from "~/utils/supabase.server";

type ProgressionContext = {
  progression: UserProgression;
  headers: Headers;
};

function normalizeProgression(value: unknown): UserProgression {
  let parsedValue = value;

  if (typeof parsedValue === "string") {
    try {
      parsedValue = JSON.parse(parsedValue) as unknown;
    } catch {
      return {};
    }
  }

  if (!parsedValue || typeof parsedValue !== "object" || Array.isArray(parsedValue)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(parsedValue).flatMap(([sectionId, sectionValue]) => {
      if (!sectionValue || typeof sectionValue !== "object" || Array.isArray(sectionValue)) {
        return [];
      }

      const levels = Object.fromEntries(
        Object.entries(sectionValue).map(([levelId, completed]) => [
          levelId,
          completed === true ||
            (typeof completed === "string" && completed.toLowerCase() === "true"),
        ]),
      );

      return [[sectionId, levels]];
    }),
  );
}

async function requireUser(request: Request) {
  const { supabase, headers } = createClient(request);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Response(null, {
      status: 302,
      headers: { Location: "/login", ...Object.fromEntries(headers) },
    });
  }

  return { supabase, headers, user };
}

export async function getUserProgression(request: Request): Promise<ProgressionContext> {
  const { supabase, headers, user } = await requireUser(request);
  headers.set("Cache-Control", "private, no-store, max-age=0");
  headers.set("Pragma", "no-cache");

  const { data: row, error } = await supabase
    .schema("public")
    .from("progress")
    .select("progression")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    throw data(
      { message: "Progres level tidak dapat dimuat.", detail: error.message },
      { status: 500, headers },
    );
  }

  return {
    progression: normalizeProgression(row?.progression),
    headers,
  };
}

export async function markLevelCompleted(
  request: Request,
  sectionId: string,
  levelId: string,
) {
  const { supabase, headers } = await requireUser(request);
  const { data: xpAwarded, error } = await supabase.rpc(
    "complete_level_and_award_xp",
    {
      p_section_id: sectionId,
      p_level_id: levelId,
    },
  );

  if (error) {
    throw data(
      { message: "Progres level tidak dapat disimpan.", detail: error.message },
      { status: 500, headers },
    );
  }

  return { headers, xpAwarded: Number(xpAwarded ?? 0) };
}
