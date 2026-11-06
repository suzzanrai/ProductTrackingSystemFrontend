import { createFileRoute, redirect } from "@tanstack/react-router";
import { clearAuthSession, getAuthToken } from "@shared/lib";
import { getRoleFromToken } from "@features/auth/model/token-role";
import {
  previewAuthenticatedUser,
  unavailableAuthenticatedUser,
} from "@features/auth/model/authenticated-user";
import { AuthenticatedDashboardLayout } from "@widgets/dashboard-layout";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    const token = getAuthToken();
    if (!token) {
      throw redirect({ to: "/login" });
    }

    if (!getRoleFromToken(token)) {
      clearAuthSession();
      throw redirect({ to: "/login" });
    }

    // Replace this preview data with the authenticated-user API response when available.
    return {
      user: import.meta.env.DEV
        ? previewAuthenticatedUser
        : unavailableAuthenticatedUser,
    };
  },
  component: AuthenticatedDashboardLayout,
});
