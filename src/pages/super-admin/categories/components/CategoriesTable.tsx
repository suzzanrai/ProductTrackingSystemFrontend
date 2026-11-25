import { useTranslation } from "react-i18next";
import { DataTable } from "../../components/DataTable";
import { RowActions } from "../../components/RowActions";
import type { MockCategory } from "../../model/mock-data";

interface CategoriesTableProps {
  categories: MockCategory[];
  onEdit: (category: MockCategory) => void;
  onDelete: (categoryId: number) => void;
}

const rowClassName = "h-14 transition-colors hover:bg-background/80";
const cellClassName = "px-4 py-2.5 md:px-5";

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
        t("dashboard.superAdminPages.action"),
      ]}
      empty={!categories.length}
      emptyLabel={t("dashboard.superAdminPages.nothingFound")}
      recordLabel={t("dashboard.superAdminPages.recordCount", {
        count: categories.length,
      })}
      minWidth={620}
    >
      {categories.map((item, index) => (
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
