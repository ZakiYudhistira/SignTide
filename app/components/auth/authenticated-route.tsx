import { useEffect, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";

import { supabase } from "~/lib/supabase/client";
import { LoadingScreen } from "~/components/ui/loading-screen";

type AuthenticatedRouteProps = {
  children: ReactNode;
};

export function AuthenticatedRoute({ children }: AuthenticatedRouteProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsCheckingAuth(true);

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

      const { data: progress, error: progressError } = await supabase
        .schema("public")
        .from("progress")
        .select("onboarding")
        .eq("id", data.user.id)
        .maybeSingle();

      const needsOnboarding = progressError || progress?.onboarding !== false;

      if (needsOnboarding && pathname !== "/onboarding") {
        if (isMounted) {
          navigate("/onboarding", { replace: true });
        }
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
  }, [navigate, pathname]);

  if (isCheckingAuth) {
    return <LoadingScreen show />;
  }

  return children;
}
