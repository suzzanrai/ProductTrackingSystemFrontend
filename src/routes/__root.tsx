import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { RouteContext } from "@shared/config";

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => <Outlet />,
});