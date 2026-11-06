import {
  ClipboardCheck,
  ClipboardList,
  Package,
  Settings,
  Users,
} from "lucide-react";
import type { DashboardOverviewConfig } from "@widgets/dashboard-overview";

export const localAdminDashboard: DashboardOverviewConfig = {
  homeTo: "/local-admin/dashboard",
  moduleRoute: "/local-admin/$module",
  roleKey: "localAdmin",
  roleNameKey: "dashboard.roles.localAdmin",
  roleDescriptionKey: "dashboard.roleDescriptions.localAdmin",
  roleIcon: Users,
  modules: [
    { id: "users", icon: Users },
    { id: "approvals", icon: ClipboardCheck },
    { id: "products", icon: Package },
    { id: "reports", icon: ClipboardList },
    { id: "settings", icon: Settings },
  ],
};
