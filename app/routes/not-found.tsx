import { data } from "react-router";

import { NotFoundPage } from "~/components/errors/not-found-page";
import { AppLayout } from "~/layout/app-layout";

export function loader() {
  return data(null, { status: 404 });
}

export function meta() {
  return [
    { title: "Halaman Tidak Ditemukan | SignTide" },
    { name: "description", content: "Halaman yang diminta tidak ditemukan." },
  ];
}

export default function NotFoundRoute() {
  return (
    <AppLayout showHeader={false} lockViewport>
      <NotFoundPage />
    </AppLayout>
  );
}
