import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthToken } from "@shared/lib";
import {
  previewAuthenticatedUser,
  unavailableAuthenticatedUser,
} from "@features/auth/model/authenticated-user";
import { AuthenticatedDashboardLayout } from "@widgets/dashboard-layout";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    if (!getAuthToken()) {
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
