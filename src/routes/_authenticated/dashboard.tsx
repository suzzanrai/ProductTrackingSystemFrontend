import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthToken } from "@shared/lib";
import { getDashboardForRole, getRoleFromToken } from "@features/auth/model/token-role";

export const Route = createFileRoute("/_authenticated/dashboard")({
  beforeLoad: () => {
    const token = getAuthToken();
    const role = token ? getRoleFromToken(token) : null;
    if (!role) throw redirect({ to: "/login" });

    throw redirect({ to: getDashboardForRole(role), replace: true });
  },
});
