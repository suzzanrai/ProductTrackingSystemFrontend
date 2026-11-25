import { neDashboardCommon } from "./common";
import { neCollectorMenu } from "./menus/collector";
import { neConsumerMenu } from "./menus/consumer";
import { neFactoryMenu } from "./menus/factory";
import { neFarmerMenu } from "./menus/farmer";
import { neLocalAdminMenu } from "./menus/local-admin";
import { neRetailerMenu } from "./menus/retailer";
import { neWholesalerMenu } from "./menus/wholesaler";

export const neDashboard = {
  ...neDashboardCommon,
  moduleNames: {
    farmer: neFarmerMenu,
    collector: neCollectorMenu,
    factory: neFactoryMenu,
    wholesaler: neWholesalerMenu,
    retailer: neRetailerMenu,
    consumer: neConsumerMenu,
    localAdmin: neLocalAdminMenu,
  },
};
