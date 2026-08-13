import { Link } from "react-router";

type ProfileHeaderProps = {
  username: string;
  imageUrl: string | null;
};

export function ProfileHeader({ username, imageUrl }: ProfileHeaderProps) {
  return (
    <section className="border-b-2 border-ocean bg-blue-3 px-6 pb-16 pt-7">
      <div className="flex items-center gap-5">
        <h1 className="text-heading text-navy-1">{username}</h1>
      </div>

      <div className="mt-9 flex justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${username} profile`}
            className="size-44 rounded-full object-cover sm:size-52"
          />
        ) : (
          <div className="size-44 rounded-full bg-black sm:size-52" aria-label="Foto profil placeholder" role="img" />
        )}
      </div>
    </section>
  );
}
