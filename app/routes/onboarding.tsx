import { redirect } from "react-router";

import type { Route } from "./+types/onboarding";

import { OnboardingPage } from "~/components/onboarding/onboarding-page";
import { ONBOARDING_CONTENT } from "~/data/onboarding/onboarding-content";
import { finishOnboarding } from "~/features/onboarding/onboarding.server";
import { learningAssetUrl } from "~/utils/learning-asset.server";

export function loader() {
  const imageUrls = Object.fromEntries(
    ONBOARDING_CONTENT.flatMap((content) =>
      content.type === "image"
        ? [[content.id, learningAssetUrl(content.assetPath)]]
        : [],
    ),
  );

  return { imageUrls };
}

export function meta() {
  return [
    { title: "Onboarding | SignTide" },
    { name: "description", content: "Pengenalan aplikasi SignTide." },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  if (formData.get("_intent") !== "finish-onboarding") {
    throw new Response("Invalid onboarding action", { status: 400 });
  }

  const { headers } = await finishOnboarding(request);
  return redirect("/level?tutorial=true", { headers });
}

export default function OnboardingRoute({ loaderData }: Route.ComponentProps) {
  return <OnboardingPage imageUrls={loaderData.imageUrls} />;
}
