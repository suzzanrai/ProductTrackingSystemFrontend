import { createFileRoute } from "@tanstack/react-router";
import { WholesalerDashboardPage } from "@pages/dashboards/wholesaler";

export const Route = createFileRoute("/_authenticated/wholesaler/dashboard")({
  component: WholesalerDashboardPage,
});
