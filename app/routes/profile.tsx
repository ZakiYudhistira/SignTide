import type { Route } from "./+types/profile";

import { ProfilePage } from "~/components/profile/profile-page";
import { getProfile } from "~/features/profile/profile.client";

export async function clientLoader() {
  return { profile: await getProfile() };
}

clientLoader.hydrate = true as const;

export function HydrateFallback() {
  return (
    <div className="flex min-h-0 flex-1 items-center justify-center px-6">
      <p className="text-body text-navy-3">Memuat profil...</p>
    </div>
  );
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile | SignTide" },
    { name: "description", content: "SignTide profile" },
  ];
}

export default function Profile({ loaderData }: Route.ComponentProps) {
  return <ProfilePage profile={loaderData.profile} />;
}
