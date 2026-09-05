import { data, isRouteErrorResponse, Link, useRouteError } from "react-router";

import type { Route } from "./+types/kitchen";

import { KitchenPage } from "~/components/kitchen/kitchen-page";
import { getActByIdentifier, registeredActs } from "~/data/learning/act-catalog";
import { cookAct, getUserProgression } from "~/features/levels/progression.server";

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: `${loaderData?.cooking.title ?? "Dapur"} | SignTide` },
    { name: "description", content: "Masak hadiah dari bahan yang telah dikumpulkan." },
  ];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const act = getActByIdentifier(params.sectionId);

  if (!act || !act.cooking.enabled) {
    throw new Response("Act not found", { status: 404, statusText: "Not Found" });
  }

  const { items, headers } = await getUserProgression(request, { allowAnonymous: true });
  return data({
    lessons: registeredActs.flatMap((registeredAct) => registeredAct.lessons),
    cooking: act.cooking.config,
    prize: act.cooking.prize,
    items,
  }, { headers });
}

export async function action({ request, params }: Route.ActionArgs) {
  const act = getActByIdentifier(params.sectionId);

  if (!act || !act.cooking.enabled) {
    throw new Response("Act not found", { status: 404, statusText: "Not Found" });
  }

  const formData = await request.formData();

  if (formData.get("_intent") !== "cook") {
    throw new Response("Invalid action", { status: 400 });
  }

  const result = await cookAct(request, act.cooking.config);
  return data({ cooked: result.cooked }, { headers: result.headers });
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="text-heading text-navy-1">Dapur tidak ditemukan</h1>
        <Link to="/level" className="welcoming-button mt-8 inline-flex items-center justify-center">Kembali</Link>
      </main>
    );
  }

  throw error;
}

export default function KitchenRoute({ loaderData }: Route.ComponentProps) {
  return <KitchenPage cooking={loaderData.cooking} prize={loaderData.prize} lessons={loaderData.lessons} items={loaderData.items} />;
}
