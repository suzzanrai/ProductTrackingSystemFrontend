import {
  createRootRouteWithContext,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { clearAuthSession, getAuthSessionExpiry } from "@shared/lib";
import type { RouteContext } from "@shared/config";

function RootComponent() {
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

    scheduleExpiry();
    window.addEventListener("storage", scheduleExpiry);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("storage", scheduleExpiry);
    };
  }, [navigate, pathname]);

  return <Outlet />;
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootComponent,
});
