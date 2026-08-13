import { supabase } from "~/lib/supabase/client";

export type LeaderboardEntry = {
  userId: string;
  username: string;
  xp: number;
};

const DEFAULT_LEADERBOARD_LIMIT = 15;

function getLeaderboardLimit() {
  const configuredLimit = Number.parseInt(
    import.meta.env.VITE_LEADERBOARD_LIMIT ?? "",
    10,
  );

  return Number.isInteger(configuredLimit) && configuredLimit > 0
    ? configuredLimit
    : DEFAULT_LEADERBOARD_LIMIT;
}

export async function getLeaderboard(): Promise<{
  entries: LeaderboardEntry[];
  currentUserId: string;
}> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    throw new Response("Sesi tidak valid. Silakan masuk kembali.", {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const { data, error } = await supabase
    .from("exp_view")
    .select("UID, username, xp")
    .order("xp", { ascending: false })
    .order("username", { ascending: true })
    .limit(getLeaderboardLimit());

  if (error) {
    throw new Response(`Leaderboard tidak dapat dimuat: ${error.message}`, {
      status: 500,
      statusText: "Supabase leaderboard query failed",
    });
  }

  return {
    currentUserId: session.user.id,
    entries: (data ?? []).map((entry) => ({
      userId: entry.UID,
      username: entry.username ?? "User",
      xp: Number(entry.xp ?? 0),
    })),
  };
}
