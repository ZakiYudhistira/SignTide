import { useState } from "react";
import { useNavigate } from "react-router";

import { supabase } from "~/lib/supabase/client";
import { invalidateProfileCache } from "~/features/profile/profile.client";

export function LogoutButton() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setError("");

    const { error: logoutError } = await supabase.auth.signOut({
      scope: "local",
    });

    if (logoutError) {
      setError(logoutError.message);
      setIsLoggingOut(false);
      return;
    }

    invalidateProfileCache();
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-full">
      <button
        className="destructive"
        type="button"
        disabled={isLoggingOut}
        onClick={handleLogout}
      >
        {isLoggingOut ? "Keluar..." : "Log Out"}
      </button>
      {error && (
        <p className="mt-2 text-center text-label text-red-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
