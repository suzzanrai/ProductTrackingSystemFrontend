import { useTranslation } from "react-i18next";
import { DataTable } from "../../components/DataTable";
import { RowActions } from "../../components/RowActions";
import type { Material } from "../api/materials";

interface ProductsTableProps {
  products: Material[];
  isNepali: boolean;
  onEdit: (product: Material) => void;
  onDelete: (productId: string) => void;
}

const rowClassName = "h-16 transition-colors hover:bg-background/80";
const cellClassName = "px-5 py-3 md:px-6";

export function ProductsTable({
  products,
  isNepali,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  const { t } = useTranslation();

  return (
    <DataTable
      headers={[
        t("dashboard.superAdminPages.no"),
        t("dashboard.superAdminPages.productCode"),
        t("dashboard.superAdminPages.nameNp"),
        t("dashboard.superAdminPages.nameEn"),
        t("dashboard.superAdminPages.category"),
        t("dashboard.superAdminPages.units"),
        t("dashboard.superAdminPages.description"),
        t("dashboard.superAdminPages.action"),
      ]}
      empty={!products.length}
      emptyLabel={t("dashboard.superAdminPages.nothingFound")}
      recordLabel={t("dashboard.superAdminPages.recordCount", {
        count: products.length,
      })}
      minWidth={1080}
    >
      {products.map((item, index) => (
        <tr key={item.id} className={rowClassName}>
          <td className={`${cellClassName} whitespace-nowrap font-mono text-sm text-text-muted`}>
            {index + 1}
          </td>
          <td className={`${cellClassName} whitespace-nowrap font-mono text-sm`}>
            {item.code}
          </td>
          <td className={`${cellClassName} whitespace-nowrap font-semibold`}>
            {item.nameNp}
          </td>
          <td className={`${cellClassName} whitespace-nowrap`}>
            {item.nameEn}
          </td>
          <td className={`${cellClassName} whitespace-nowrap text-text-muted`}>
            {isNepali ? item.materialCategoryNameNp : item.materialCategoryNameEn}
          </td>
          <td className={cellClassName}>
            <div className="flex flex-wrap gap-1">
              {item.units.map((unit) => (
                <span
                  key={unit.unitId}
                  className={`rounded px-2.5 py-1 text-sm font-semibold ${
                    unit.isBaseUnit
                      ? "bg-primary-light text-primary"
                      : "bg-background text-text-muted"
                  }`}
                  title={`${unit.conversionFactorToBaseUnit} ${t(
                    "dashboard.superAdminPages.conversionFactor",
                  )}`}
                >
                  {unit.abbreviation}
                </span>
              ))}
            </div>
          </td>
          <td className={`${cellClassName} max-w-xs truncate text-text-muted`}>
            {item.description ?? "—"}
          </td>
          <td className={cellClassName}>
            <RowActions
              editLabel={t("dashboard.superAdminPages.edit")}
              deleteLabel={t("dashboard.superAdminPages.delete")}
              onEdit={() => onEdit(item)}
              onDelete={() => onDelete(item.id)}
            />
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
