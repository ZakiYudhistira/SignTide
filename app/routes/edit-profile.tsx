import type { Route } from "./+types/edit-profile";

import { EditProfilePage } from "~/components/profile/edit-profile-page";
import { getProfile } from "~/features/profile/profile.client";

export async function clientLoader() {
  return { profile: await getProfile() };
}

clientLoader.hydrate = true as const;

export function HydrateFallback() {
  return <div className="flex flex-1 items-center justify-center text-body text-navy-3">Memuat profil...</div>;
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Edit Profile | SignTide" }];
}

export default function EditProfile({ loaderData }: Route.ComponentProps) {
  return <EditProfilePage profile={loaderData.profile} />;
}
