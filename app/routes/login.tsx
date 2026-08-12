import { UnauthenticatedRoute } from "~/components/auth/unauthenticated-route";
import { LoginPage } from "~/components/auth/login-page";

import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Log In | SignTide" },
    { name: "description", content: "Log in or register for SignTide" },
  ];
}

export default function Login() {
  return (
    <UnauthenticatedRoute>
      <LoginPage />
    </UnauthenticatedRoute>
  );
}
