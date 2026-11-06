import {
  Outlet,
  useNavigate,
  useRouterState,
  useRouteContext,
} from "@tanstack/react-router";
import { DashboardLayout } from "./DashboardLayout";
import { collectorDashboard } from "@pages/dashboards/collector/model/navigation";
import { consumerDashboard } from "@pages/dashboards/consumer/model/navigation";
import { factoryDashboard } from "@pages/dashboards/factory/model/navigation";
import { farmerDashboard } from "@pages/dashboards/farmer/model/navigation";
import { localAdminDashboard } from "@pages/dashboards/local-admin/model/navigation";
import { retailerDashboard } from "@pages/dashboards/retailer/model/navigation";
import { superAdminDashboard } from "@pages/dashboards/super-admin/model/navigation";
import { wholesalerDashboard } from "@pages/dashboards/wholesaler/model/navigation";
import type { DashboardOverviewConfig } from "@widgets/dashboard-overview";

const dashboards: readonly DashboardOverviewConfig[] = [
  farmerDashboard,
  collectorDashboard,
  factoryDashboard,
  wholesalerDashboard,
  retailerDashboard,
  consumerDashboard,
  localAdminDashboard,
  superAdminDashboard,
];

export function AuthenticatedDashboardLayout() {
  const { user } = useRouteContext({ from: "/_authenticated" });
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const navigate = useNavigate();
  const dashboard =
    dashboards.find((item) => {
      const basePath = item.homeTo.replace("/dashboard", "");
      return pathname === item.homeTo || pathname.startsWith(`${basePath}/`);
    }) ?? farmerDashboard;

  function changePreviewRole(roleKey: string) {
    const nextDashboard = dashboards.find((item) => item.roleKey === roleKey);
    if (nextDashboard) {
      void navigate({ to: nextDashboard.homeTo });
    }
  }

  return (
    <DashboardLayout
      config={dashboard}
      previewDashboards={import.meta.env.DEV ? dashboards : [dashboard]}
      user={user}
      showPreviewRoleSelector={false}
      onPreviewRoleChange={changePreviewRole}
    >
      <Outlet />
    </DashboardLayout>
  );
}
