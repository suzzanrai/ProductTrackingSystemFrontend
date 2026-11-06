import {
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import {
  AUTH_SESSION_EXPIRED_EVENT,
  clearAuthSession,
  getAuthSessionExpiry,
} from "@shared/lib";

export function RootComponent() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    let timeout: number | undefined;

    const scheduleExpiry = () => {
      window.clearTimeout(timeout);
      const expiresAt = getAuthSessionExpiry();
      if (expiresAt === null) return;

      const remaining = expiresAt - Date.now();
      if (remaining <= 0) {
        clearAuthSession();
        void navigate({ to: "/login", replace: true });
        return;
      }

      timeout = window.setTimeout(() => {
        clearAuthSession();
        void navigate({ to: "/login", replace: true });
      }, remaining);
    };
    const handleSessionFailure = () => {
      clearAuthSession();
      void navigate({ to: "/login", replace: true });
    };

    scheduleExpiry();
    window.addEventListener("storage", scheduleExpiry);
    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionFailure);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("storage", scheduleExpiry);
      window.removeEventListener(
        AUTH_SESSION_EXPIRED_EVENT,
        handleSessionFailure,
      );
    };
  }, [navigate, pathname]);

  return <Outlet />;
}
