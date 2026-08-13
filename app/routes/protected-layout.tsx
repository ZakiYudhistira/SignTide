import { Outlet } from "react-router";

import { AuthenticatedRoute } from "~/components/auth/authenticated-route";
import { NavLayout } from "~/layout/nav-layout";

export default function ProtectedLayout() {
  return (
    <AuthenticatedRoute>
      <NavLayout>
        <Outlet />
      </NavLayout>
    </AuthenticatedRoute>
  );
}
