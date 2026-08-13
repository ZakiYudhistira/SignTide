import type { Route } from "./+types/leaderboard";

import { LeaderboardPage } from "~/components/leaderboard/leaderboard-page";
import { getLeaderboard } from "~/features/leaderboard/leaderboard.client";

export async function clientLoader() {
  return getLeaderboard();
}

clientLoader.hydrate = true as const;

export function HydrateFallback() {
  return (
    <div className="flex min-h-0 flex-1 items-center justify-center px-6">
      <p className="text-body text-navy-3">Memuat leaderboard...</p>
    </div>
  );
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Leaderboard | SignTide" },
    { name: "description", content: "SignTide leaderboard" },
  ];
}

export default function Leaderboard({ loaderData }: Route.ComponentProps) {
  return <LeaderboardPage {...loaderData} />;
}
