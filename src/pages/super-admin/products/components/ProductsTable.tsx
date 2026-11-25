import { useTranslation } from "react-i18next";
import { DataTable } from "../../components/DataTable";
import { RowActions } from "../../components/RowActions";
import type {
  MockCategory,
  MockProduct,
  MockUnit,
} from "../../model/mock-data";

interface ProductsTableProps {
  products: MockProduct[];
  categories: MockCategory[];
  units: MockUnit[];
  isNepali: boolean;
  onEdit: (product: MockProduct) => void;
  onDelete: (productId: number) => void;
}

const rowClassName = "h-14 transition-colors hover:bg-background/80";
const cellClassName = "px-4 py-2.5 md:px-5";

export function ProductsTable({
  products,
  categories,
  units,
  isNepali,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  const { t } = useTranslation();

  return (
    <DataTable
      headers={[
        t("dashboard.superAdminPages.no"),
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
      minWidth={1040}
    >
      {products.map((item, index) => {
        const category = categories.find(
          (entry) => entry.id === item.categoryId,
        );
        return (
          <tr key={item.id} className={rowClassName}>
            <td className={`${cellClassName} whitespace-nowrap font-mono text-xs text-text-muted`}>
              {index + 1}
            </td>
            <td className={`${cellClassName} whitespace-nowrap font-semibold`}>
              {item.nameNp}
            </td>
            <td className={`${cellClassName} whitespace-nowrap`}>
              {item.nameEn}
            </td>
            <td className={`${cellClassName} whitespace-nowrap text-text-muted`}>
              {category
                ? isNepali
                  ? category.nameNp
                  : category.nameEn
                : "—"}
            </td>
            <td className={cellClassName}>
              <div className="flex flex-wrap gap-1">
                {item.units.map((unitKey) => {
                  const unit = units.find(
                    (entry) => entry.shortEn === unitKey,
                  );
                  return (
                    <span
                      key={unitKey}
                      className="rounded bg-primary-light px-2 py-0.5 text-xs font-semibold text-primary"
                    >
                      {unit
                        ? isNepali
                          ? unit.shortNp
                          : unit.shortEn
                        : unitKey}
                    </span>
                  );
                })}
              </div>
            </td>
            <td className={`${cellClassName} max-w-xs truncate text-text-muted`}>
              {isNepali ? item.descNp : item.descEn}
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
        );
      })}
    </DataTable>
  );
}
