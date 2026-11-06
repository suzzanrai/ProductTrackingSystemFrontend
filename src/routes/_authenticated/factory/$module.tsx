import { createFileRoute } from "@tanstack/react-router";
import { FactoryModulePage } from "@pages/dashboards/factory";
import { requireBackendRole } from "@features/auth/model/route-access";

export const Route = createFileRoute("/_authenticated/factory/$module")({
  beforeLoad: () => requireBackendRole("FactoryAdmin"),
  component: FactoryModulePage,
});
