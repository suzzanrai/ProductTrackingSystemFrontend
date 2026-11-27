import { enDashboard } from "./dashboard";
import { enShared } from "./shared";
import { enSuperAdmin } from "./super-admin";

export const enCommon = {
  ...enShared,
  superAdmin: enSuperAdmin.superAdmin,
  dashboard: {
    ...enDashboard,
    ...enSuperAdmin.dashboard,
    moduleNames: {
      ...enDashboard.moduleNames,
      ...enSuperAdmin.dashboard.moduleNames,
    },
  },
};
