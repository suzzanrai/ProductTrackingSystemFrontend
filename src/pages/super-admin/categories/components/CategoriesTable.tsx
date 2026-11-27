import { useTranslation } from "react-i18next";
import { DataTable } from "../../components/DataTable";
import { RowActions } from "../../components/RowActions";
import type { MaterialCategory } from "../api/categories";

interface CategoriesTableProps {
  categories: MaterialCategory[];
  onEdit: (category: MaterialCategory) => void;
  onDelete: (categoryId: string) => void;
}

const rowClassName = "h-16 transition-colors hover:bg-background/80";
const cellClassName = "px-5 py-3 md:px-6";

export function CategoriesTable({
  categories,
  onEdit,
  onDelete,
}: CategoriesTableProps) {
  const { t } = useTranslation();

  return (
    <DataTable
      headers={[
        t("dashboard.superAdminPages.no"),
        t("dashboard.superAdminPages.nameNp"),
        t("dashboard.superAdminPages.nameEn"),
        t("dashboard.superAdminPages.categoryCode"),
        t("dashboard.superAdminPages.parentCategory"),
        t("dashboard.superAdminPages.description"),
        t("dashboard.superAdminPages.createdAt"),
        t("dashboard.superAdminPages.action"),
      ]}
      empty={!categories.length}
      emptyLabel={t("dashboard.superAdminPages.nothingFound")}
      recordLabel={t("dashboard.superAdminPages.recordCount", {
        count: categories.length,
      })}
      minWidth={980}
    >
      {categories.map((item, index) => (
        <tr key={item.id} className={rowClassName}>
          <td className={`${cellClassName} whitespace-nowrap font-mono text-sm text-text-muted`}>
            {index + 1}
          </td>
          <td className={`${cellClassName} whitespace-nowrap font-semibold`}>
            {item.nameNp}
          </td>
          <td className={`${cellClassName} whitespace-nowrap`}>
            {item.nameEn}
          </td>
          <td className={`${cellClassName} whitespace-nowrap font-mono text-sm`}>
            {item.code || "—"}
          </td>
          <td className={`${cellClassName} whitespace-nowrap text-text-muted`}>{item.parentCategoryNameEn || "—"}</td>
          <td className={`${cellClassName} max-w-xs truncate text-text-muted`}>{item.description || "—"}</td>
          <td className={`${cellClassName} whitespace-nowrap text-sm text-text-muted`}>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—"}</td>
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
