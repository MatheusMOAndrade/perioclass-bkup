import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

const AuthGuard = (props: any) => {
  const { children, fallback } = props;

  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (loading) return;

      if (!user?.userToken && router.asPath !== "/user/new" ) {
        if (router.asPath !== "/" ) {
          router.replace({
            pathname: "/login",
            query: { returnUrl: router.asPath },
          });
        } else {
          router.replace("/login");
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route, loading]
  );

  
  if (router.asPath === "/user/new" || user?.userToken) {
    return <>{children}</>;
  }

  if (!user?.userToken) {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;
