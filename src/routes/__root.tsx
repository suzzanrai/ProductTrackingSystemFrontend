import { createRootRouteWithContext } from "@tanstack/react-router";
import type { RouteContext } from "@shared/config";
import { RootComponent } from "@app/RootComponent";

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootComponent,
});
