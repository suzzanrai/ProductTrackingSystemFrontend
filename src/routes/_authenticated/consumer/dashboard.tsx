import { createFileRoute } from "@tanstack/react-router";
import { ConsumerDashboardPage } from "@pages/consumer";

export const Route = createFileRoute("/_authenticated/consumer/dashboard")({
  component: ConsumerDashboardPage,
});
