import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getAuthToken, clearAuthSession } from "@shared/lib";
import { getDashboardForRole, getRoleFromToken } from "@features/auth/model/token-role";

export const Route = createFileRoute("/_auth")({
  component: () => <Outlet />,
  beforeLoad: () => {
    const token = getAuthToken();
    if (!token) return;

    const role = getRoleFromToken(token);
    if (!role) {
      clearAuthSession();
      return;
    }

    throw redirect({ to: getDashboardForRole(role), replace: true });
  },
});
