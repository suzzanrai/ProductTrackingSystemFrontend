import { createFileRoute } from "@tanstack/react-router";
import { CollectorModulePage } from "@pages/dashboards/collector";

export const Route = createFileRoute("/_authenticated/collector/$module")({
  component: CollectorModulePage,
});
