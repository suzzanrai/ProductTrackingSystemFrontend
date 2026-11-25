import { createFileRoute } from "@tanstack/react-router";
import { SuperAdminModulePage } from "@pages/super-admin";

export const Route = createFileRoute("/_authenticated/super-admin/$module")({
  component: SuperAdminModulePage,
});
