import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthToken } from "@shared/lib";
import { SuperAdminPage } from "@pages/super-admin";

export const Route = createFileRoute("/super-admin")({
  beforeLoad: () => {
    if (!getAuthToken()) {
      throw redirect({ to: "/login" });
    }
  },
  component: SuperAdminPage,
});
