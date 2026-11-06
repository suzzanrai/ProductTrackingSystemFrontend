import { createFileRoute } from "@tanstack/react-router";
import { FarmerModulePage } from "@pages/dashboards/farmer";
import { requireBackendRole } from "@features/auth/model/route-access";

export const Route = createFileRoute("/_authenticated/farmer/$module")({
  beforeLoad: () => requireBackendRole("Farmer"),
  component: FarmerModulePage,
});
