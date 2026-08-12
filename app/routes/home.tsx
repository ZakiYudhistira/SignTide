import type { Route } from "./+types/home";
import { WelcomeCarousel } from "~/components/onboarding/welcome-carousel";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "SignTide" },
    { name: "description", content: "SignTide mobile application" },
  ];
}

export default function Home() {
  return <WelcomeCarousel />;
}
