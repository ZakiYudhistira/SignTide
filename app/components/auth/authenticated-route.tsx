import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";

import { supabase } from "~/lib/supabase/client";

type AuthenticatedRouteProps = {
  children: ReactNode;
};

export function AuthenticatedRoute({ children }: AuthenticatedRouteProps) {
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const redirectToLogin = () => {
      if (isMounted) {
        navigate("/login", { replace: true });
      }
    };

    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        redirectToLogin();
        return;
      }

      if (isMounted) {
        setIsCheckingAuth(false);
      }
    };

    void checkUser();

    const { data: authSubscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          redirectToLogin();
        }
      },
    );

    return () => {
      isMounted = false;
      authSubscription.subscription.unsubscribe();
    };
  }, [navigate]);

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center px-6">
        <p className="text-body text-navy-3">Memeriksa sesi...</p>
      </div>
    );
  }

  return children;
}
