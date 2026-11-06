import { createFileRoute } from "@tanstack/react-router";
import { ConsumerModulePage } from "@pages/dashboards/consumer";

export const Route = createFileRoute("/_authenticated/consumer/$module")({
  component: ConsumerModulePage,
});
