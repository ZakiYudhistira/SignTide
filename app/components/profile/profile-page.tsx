import { ProfileAchievements } from "./profile-achievements";
import { ProfileHeader } from "./profile-header";
import { ProfileOverview } from "./profile-overview";
import { LogoutButton } from "~/components/auth/logout-button";
import { Link } from "react-router";
import type { ProfileViewModel } from "~/features/profile/profile.types";

type ProfilePageProps = {
  profile: ProfileViewModel;
};

export function ProfilePage({ profile }: ProfilePageProps) {
  return (
    <div className="bg-background">
      <ProfileHeader username={profile.username} imageUrl={profile.avatarUrl} />
      <div className="space-y-12 px-5 pb-10 pt-10">
        <ProfileOverview streak={profile.streaks} xp={profile.xp} />
        <ProfileAchievements achievements={profile.achievements} />

        <Link to="/profile/edit" className="welcoming-button block text-center">
          Edit profile
        </Link>

        <img
          src="/Profile/SignTide_Banner.png"
          alt="SignTide achievement banner"
          className="w-full rounded-[1.5rem] object-cover"
        />

        <LogoutButton />
      </div>
    </div>
  );
}
