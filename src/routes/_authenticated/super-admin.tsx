import { createFileRoute } from "@tanstack/react-router";
import { SuperAdminRouteLayout } from "@pages/super-admin/SuperAdminRouteLayout";
import { requireBackendRole } from "@features/auth/model/route-access";

export const Route = createFileRoute("/_authenticated/super-admin")({
  beforeLoad: () => requireBackendRole("SuperAdmin"),
  component: SuperAdminRouteLayout,
});
