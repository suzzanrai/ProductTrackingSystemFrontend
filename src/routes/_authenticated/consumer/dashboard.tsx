import { createFileRoute } from "@tanstack/react-router";
import { ConsumerDashboardPage } from "@pages/dashboards/consumer";

export const Route = createFileRoute("/_authenticated/consumer/dashboard")({
  component: ConsumerDashboardPage,
});
