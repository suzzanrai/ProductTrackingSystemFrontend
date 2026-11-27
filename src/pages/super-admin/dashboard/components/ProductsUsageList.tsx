import { useTranslation } from "react-i18next";
import { DashboardCard } from "@shared/ui";

interface UsageProduct {
  id: string;
  nameEn: string;
  nameNp: string;
  usedCount: number;
}

interface ProductsUsageListProps {
  products: UsageProduct[];
}

export function ProductsUsageList({ products }: ProductsUsageListProps) {
  const { t, i18n } = useTranslation();
  const collectionProducts = [...products].sort(
    (first, second) => second.usedCount - first.usedCount,
  );
  const maximumCount = collectionProducts[0]?.usedCount ?? 1;

  return (
    <DashboardCard aria-labelledby="products-used-heading" className="space-y-6 p-6 md:p-8">
      <h2 id="products-used-heading" className="text-2xl font-semibold text-text">
        {t("dashboard.productsUsedInCollection")}
      </h2>
      {collectionProducts.length === 0 ? (
        <p className="text-sm text-text-muted">
          {t("dashboard.superAdminPages.noUsageData")}
        </p>
      ) : (
        <div className="space-y-5">
          {collectionProducts.map((product) => {
            const productName = i18n.language.startsWith("ne")
              ? product.nameNp
              : product.nameEn;
            return (
              <div key={product.id} className="space-y-1.5">
                <div className="flex items-center justify-between gap-4 text-sm font-medium">
                  <span className="text-text">{productName}</span>
                  <span className="shrink-0 font-semibold text-primary">
                    {product.usedCount} {t("dashboard.times")}
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-label={productName}
                  aria-valuemin={0}
                  aria-valuemax={maximumCount}
                  aria-valuenow={product.usedCount}
                  className="h-6 w-full overflow-hidden rounded-control bg-primary-light"
                >
                  <div
                    className="h-full rounded-control bg-primary transition-[width]"
                    style={{
                      width: `${(product.usedCount / maximumCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardCard>
  );
}
