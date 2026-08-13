import { Outlet } from "react-router";

import { AppLayout } from "~/layout/app-layout";

export default function PublicLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
