import { data } from "react-router";

import type { ActCookingConfig, CookedActs, UserItems, UserProgression } from "~/models/learning";
import type { RewardItemName } from "~/models/level";
import { createClient } from "~/utils/supabase.server";

type ProgressionContext = {
  progression: UserProgression;
  items: UserItems;
  cookedActs: CookedActs;
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

function normalizeItems(value: unknown): UserItems {
  let parsedValue = value;

  if (typeof parsedValue === "string") {
    try {
      parsedValue = JSON.parse(parsedValue) as unknown;
    } catch {
      return [];
    }
  }

  if (!Array.isArray(parsedValue)) return [];
  return [...new Set(parsedValue.filter((item): item is string => typeof item === "string"))];
}

function normalizeCookedActs(value: unknown): CookedActs {
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
    Object.entries(parsedValue).map(([sectionId, cooked]) => [sectionId, cooked === true]),
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

export async function getUserProgression(
  request: Request,
  options: { allowAnonymous?: boolean } = {},
): Promise<ProgressionContext> {
  const { supabase, headers } = createClient(request);
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    if (options.allowAnonymous) {
      return { progression: {}, items: [], cookedActs: {}, headers };
    }

    throw new Response(null, {
      status: 302,
      headers: { Location: "/login", ...Object.fromEntries(headers) },
    });
  }

  const user = authData.user;
  headers.set("Cache-Control", "private, no-store, max-age=0");
  headers.set("Pragma", "no-cache");

  const { data: row, error } = await supabase
    .schema("public")
    .from("progress")
    .select("progression, items, masak")
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
    items: normalizeItems(row?.items),
    cookedActs: normalizeCookedActs(row?.masak),
    headers,
  };
}

export async function cookAct(request: Request, config: ActCookingConfig) {
  const { supabase, headers } = createClient(request);
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    return { cooked: false, headers };
  }

  const { data: row, error: readError } = await supabase
    .schema("public")
    .from("progress")
    .select("items, masak")
    .eq("id", authData.user.id)
    .maybeSingle();

  if (readError) {
    throw data(
      { message: "Status memasak tidak dapat dimuat.", detail: readError.message },
      { status: 500, headers },
    );
  }

  const items = normalizeItems(row?.items);
  const cookedActs = normalizeCookedActs(row?.masak);

  if (!config.requiredItems.every((item) => items.includes(item))) {
    throw data(
      { message: "Semua bahan makanan harus dikumpulkan terlebih dahulu." },
      { status: 400, headers },
    );
  }

  if (cookedActs[config.sectionId]) {
    return { cooked: true, headers };
  }

  const { data: updatedRow, error: updateError } = await supabase
    .schema("public")
    .from("progress")
    .update({ masak: { ...cookedActs, [config.sectionId]: true } })
    .eq("id", authData.user.id)
    .select("id")
    .maybeSingle();

  if (updateError) {
    throw data(
      { message: "Hasil masakan tidak dapat disimpan.", detail: updateError.message },
      { status: 500, headers },
    );
  }

  if (!updatedRow) {
    throw data(
      { message: "Baris progres pengguna tidak dapat diperbarui." },
      { status: 500, headers },
    );
  }

  return { cooked: true, headers };
}

export async function markLevelCompleted(
  request: Request,
  sectionId: string,
  levelId: string,
  rewardItem: RewardItemName | null,
) {
  const { supabase, headers } = await requireUser(request);
  const { data: xpAwarded, error } = await supabase.rpc(
    "complete_level_and_award_xp",
    {
      p_section_id: sectionId,
      p_level_id: levelId,
      p_reward_item: rewardItem,
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
