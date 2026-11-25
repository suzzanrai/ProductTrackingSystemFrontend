import { createFileRoute } from "@tanstack/react-router";
import { RetailerModulePage } from "@pages/retailer";

export const Route = createFileRoute("/_authenticated/retailer/$module")({
  component: RetailerModulePage,
});
