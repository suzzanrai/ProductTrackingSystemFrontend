import { Archive, ClipboardList, QrCode, User } from "lucide-react";
import type { DashboardOverviewConfig } from "@widgets/dashboard-overview";

export const consumerDashboard: DashboardOverviewConfig = {
  homeTo: "/consumer/dashboard",
  moduleRoute: "/consumer/$module",
  roleKey: "consumer",
  roleNameKey: "roleSelect.roles.consumer.title",
  roleDescriptionKey: "roleSelect.roles.consumer.description",
  roleIcon: User,
  modules: [
    { id: "scan", icon: QrCode },
    { id: "history", icon: ClipboardList },
    { id: "saved", icon: Archive },
  ],
};
