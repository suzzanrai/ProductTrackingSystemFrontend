import { createFileRoute } from "@tanstack/react-router";
import { SuperAdminModulePage } from "@pages/dashboards/super-admin";

export const Route = createFileRoute("/_authenticated/super-admin/$module")({
  component: SuperAdminModulePage,
});
