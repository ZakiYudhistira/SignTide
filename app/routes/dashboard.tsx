import { AuthenticatedRoute } from "~/components/auth/authenticated-route";
import { DashboardPlaceholder } from "~/components/dashboard/dashboard-placeholder";

import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard | SignTide" },
    { name: "description", content: "SignTide dashboard" },
  ];
}

export default function Dashboard() {
  return (
    <AuthenticatedRoute>
      <DashboardPlaceholder />
    </AuthenticatedRoute>
  );
}
