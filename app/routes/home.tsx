import type { Route } from "./+types/home";
import { UnauthenticatedRoute } from "~/components/auth/unauthenticated-route";
import { WelcomeCarousel } from "~/components/onboarding/welcome-carousel";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "SignTide" },
    { name: "description", content: "SignTide mobile application" },
  ];
}

export default function Home() {
  return (
    <UnauthenticatedRoute authenticatedRedirectTo="/level">
      <WelcomeCarousel />
    </UnauthenticatedRoute>
  );
}
