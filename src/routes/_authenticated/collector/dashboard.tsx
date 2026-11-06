import { createFileRoute } from "@tanstack/react-router";
import { CollectorDashboardPage } from "@pages/dashboards/collector";

export const Route = createFileRoute("/_authenticated/collector/dashboard")({
  component: CollectorDashboardPage,
});
