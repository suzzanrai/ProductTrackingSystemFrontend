import { createFileRoute } from "@tanstack/react-router";
import { LocalAdminModulePage } from "@pages/local-admin";
import { requireBackendRole } from "@features/auth/model/route-access";

export const Route = createFileRoute("/_authenticated/local-admin/$module")({
  beforeLoad: () => requireBackendRole("LocalAdmin"),
  component: LocalAdminModulePage,
});
