import { Outlet } from "react-router";

import { AuthenticatedRoute } from "~/components/auth/authenticated-route";
import { AppLayout } from "~/layout/app-layout";

export default function ProtectedNoNavLayout() {
  return (
    <AuthenticatedRoute>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </AuthenticatedRoute>
  );
}
