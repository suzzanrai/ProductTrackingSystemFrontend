import { Navigate, Outlet, useRouterState } from "@tanstack/react-router";

export function SuperAdminRouteLayout() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return pathname === "/super-admin" ? (
    <Navigate to="/super-admin/dashboard" replace />
  ) : (
    <Outlet />
  );
}
