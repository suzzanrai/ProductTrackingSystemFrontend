import { createFileRoute } from "@tanstack/react-router";
import { ConsumerModulePage } from "@pages/consumer";

export const Route = createFileRoute("/_authenticated/consumer/$module")({
  component: ConsumerModulePage,
});
