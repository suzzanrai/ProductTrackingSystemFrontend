import { createFileRoute } from "@tanstack/react-router";
import { RetailerDashboardPage } from "@pages/retailer";

export const Route = createFileRoute("/_authenticated/retailer/dashboard")({
  component: RetailerDashboardPage,
});
