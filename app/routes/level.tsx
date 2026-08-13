import { DashboardPlaceholder } from "~/components/dashboard/dashboard-placeholder";

import type { Route } from "./+types/level";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Level | SignTide" },
    { name: "description", content: "SignTide levels" },
  ];
}

export default function Level() {
  return <DashboardPlaceholder />;
}
