import { Package, Ruler, Shapes, Users } from "lucide-react";
import type { DashboardOverviewConfig } from "@widgets/dashboard-overview";

export const superAdminDashboard: DashboardOverviewConfig = {
  homeTo: "/super-admin/dashboard",
  moduleRoute: "/super-admin/$module",
  roleKey: "superAdmin",
  roleNameKey: "dashboard.roles.superAdmin",
  roleDescriptionKey: "dashboard.roleDescriptions.superAdmin",
  roleIcon: Users,
  modules: [
    { id: "products", icon: Package },
    { id: "categories", icon: Shapes },
    { id: "units", icon: Ruler },
    { id: "localAdmin", icon: Users },
  ],
};
