import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";

import { supabase } from "~/lib/supabase/client";

type UnauthenticatedRouteProps = {
  children: ReactNode;
};

export function UnauthenticatedRoute({ children }: UnauthenticatedRouteProps) {
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const redirectToDashboard = () => {
      if (isMounted) {
        navigate("/dashboard", { replace: true });
      }
    };

    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        redirectToDashboard();
        return;
      }

      if (isMounted) {
        setIsCheckingAuth(false);
      }
    };

    void checkUser();

    const { data: authSubscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          redirectToDashboard();
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
