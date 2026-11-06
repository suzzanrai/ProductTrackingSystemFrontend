import { createFileRoute } from "@tanstack/react-router";
import { RetailerModulePage } from "@pages/dashboards/retailer";

export const Route = createFileRoute("/_authenticated/retailer/$module")({
  component: RetailerModulePage,
});
