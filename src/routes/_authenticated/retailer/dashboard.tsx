import { createFileRoute } from "@tanstack/react-router";
import { RetailerDashboardPage } from "@pages/dashboards/retailer";

export const Route = createFileRoute("/_authenticated/retailer/dashboard")({
  component: RetailerDashboardPage,
});
