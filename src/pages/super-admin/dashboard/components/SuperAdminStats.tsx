import { Package, Ruler, Shapes } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DashboardCard } from "@shared/ui";

interface SuperAdminStatsProps {
  productCount: number;
  categoryCount: number;
  unitCount: number;
}

export function SuperAdminStats({
  productCount,
  categoryCount,
  unitCount,
}: SuperAdminStatsProps) {
  const { t } = useTranslation();
  const statistics = [
    { label: t("dashboard.superAdminStats.products"), value: productCount, Icon: Package },
    { label: t("dashboard.superAdminStats.categories"), value: categoryCount, Icon: Shapes },
    { label: t("dashboard.superAdminStats.units"), value: unitCount, Icon: Ruler },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {statistics.map(({ label, value, Icon }) => (
        <DashboardCard key={label} className="flex items-center justify-between gap-4 p-6">
          <div className="space-y-1">
            <p className="text-sm text-text-muted">{label}</p>
            <p className="text-[48px] font-bold leading-none text-text">{value}</p>
          </div>
          <span className="flex size-[72px] shrink-0 items-center justify-center rounded-control bg-primary-light text-primary">
            <Icon size={36} strokeWidth={1.8} aria-hidden="true" />
          </span>
        </DashboardCard>
      ))}
    </div>
  );
}
