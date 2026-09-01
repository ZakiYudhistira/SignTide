import { Outlet } from "react-router";

import { AuthenticatedRoute } from "~/components/auth/authenticated-route";
import { AppLayout } from "~/layout/app-layout";

export default function ProtectedLevelLayout() {
  return (
    <AuthenticatedRoute>
      <AppLayout showHeader={false} lockViewport>
        <Outlet />
      </AppLayout>
    </AuthenticatedRoute>
  );
}
