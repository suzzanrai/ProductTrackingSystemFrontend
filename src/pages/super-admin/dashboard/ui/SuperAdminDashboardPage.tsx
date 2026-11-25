import { useTranslation } from "react-i18next";
import { useSuperAdminMockData } from "../../model/mock-data";
import { ProductsUsageList } from "../components/ProductsUsageList";
import { SuperAdminStats } from "../components/SuperAdminStats";

export function SuperAdminDashboardPage() {
  const { t } = useTranslation();
  const products = useSuperAdminMockData((state) => state.products);
  const categories = useSuperAdminMockData((state) => state.categories);
  const units = useSuperAdminMockData((state) => state.units);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-[32px] font-bold leading-tight text-text">
          {t("dashboard.dashboard")}
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          {t("dashboard.superAdminWelcome")}
        </p>
      </header>

      <SuperAdminStats
        productCount={products.length}
        categoryCount={categories.length}
        unitCount={units.length}
      />
      <ProductsUsageList products={products} />
    </section>
  );
}
