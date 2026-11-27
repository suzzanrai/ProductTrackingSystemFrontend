import type { enCommon } from "../en/common";
import { neDashboard } from "./dashboard";
import { neShared } from "./shared";
import { neSuperAdmin } from "./super-admin";

export const neCommon: typeof enCommon = {
  ...neShared,
  superAdmin: neSuperAdmin.superAdmin,
  dashboard: {
    ...neDashboard,
    ...neSuperAdmin.dashboard,
    moduleNames: {
      ...neDashboard.moduleNames,
      ...neSuperAdmin.dashboard.moduleNames,
    },
  },
};
