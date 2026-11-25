import { createFileRoute } from "@tanstack/react-router";
import { WholesalerModulePage } from "@pages/wholesaler";

export const Route = createFileRoute("/_authenticated/wholesaler/$module")({
  component: WholesalerModulePage,
});
