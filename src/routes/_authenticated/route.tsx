import { createFileRoute, redirect } from "@tanstack/react-router";
import { clearAuthSession, getAuthToken } from "@shared/lib";
import { getAuthenticatedUser } from "@features/auth/api/get-authenticated-user";
import { getRoleFromToken } from "@features/auth/model/token-role";
import { AuthenticatedDashboardLayout } from "@widgets/dashboard-layout";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const token = getAuthToken();
    if (!token) {
      throw redirect({ to: "/login" });
    }

    if (!getRoleFromToken(token)) {
      clearAuthSession();
      throw redirect({ to: "/login" });
    }

    return {
      user: await getAuthenticatedUser(),
    };
  },
  component: AuthenticatedDashboardLayout,
});
