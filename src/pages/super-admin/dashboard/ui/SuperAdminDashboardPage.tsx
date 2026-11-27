import { useTranslation } from "react-i18next";
import { ApiStatus } from "../../components/ApiStatus";
import { useMaterialCategories } from "../../categories/api/categories";
import { useMaterials } from "../../products/api/materials";
import { useUnits } from "../../unit/api/units";
import { SuperAdminStats } from "../components/SuperAdminStats";

export function SuperAdminDashboardPage() {
  const { t } = useTranslation();
  const productsQuery = useMaterials();
  const categoriesQuery = useMaterialCategories();
  const unitsQuery = useUnits();

  const isLoading =
    productsQuery.isLoading ||
    categoriesQuery.isLoading ||
    unitsQuery.isLoading;
  const error =
    productsQuery.error ??
    categoriesQuery.error ??
    unitsQuery.error;

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold leading-tight text-text">
          {t("dashboard.dashboard")}
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          {t("dashboard.superAdminWelcome")}
        </p>
      </header>

      <ApiStatus
        loading={isLoading}
        error={error}
        onRetry={() => {
          void Promise.all([
            productsQuery.refetch(),
            categoriesQuery.refetch(),
            unitsQuery.refetch(),
          ]);
        }}
      />
      {!isLoading && !error && (
        <>
          <SuperAdminStats
            productCount={productsQuery.data?.length ?? 0}
            categoryCount={categoriesQuery.data?.length ?? 0}
            unitCount={unitsQuery.data?.length ?? 0}
          />
        </>
      )}
    </section>
  );
}
