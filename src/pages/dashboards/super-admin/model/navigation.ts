import {
  ClipboardList,
  QrCode,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { DashboardOverviewConfig } from "@widgets/dashboard-overview";

export const superAdminDashboard: DashboardOverviewConfig = {
  homeTo: "/super-admin/dashboard",
  moduleRoute: "/super-admin/$module",
  roleKey: "superAdmin",
  roleNameKey: "dashboard.roles.superAdmin",
  roleDescriptionKey: "dashboard.roleDescriptions.superAdmin",
  roleIcon: ShieldCheck,
  modules: [
    { id: "organizations", icon: Users },
    { id: "roles", icon: ShieldCheck },
    { id: "audits", icon: ClipboardList },
    { id: "qrVault", icon: QrCode },
    { id: "settings", icon: Settings },
  ],
};
