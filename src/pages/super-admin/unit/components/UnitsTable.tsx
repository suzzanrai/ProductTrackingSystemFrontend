import { useTranslation } from "react-i18next";
import { DataTable } from "../../components/DataTable";
import { RowActions } from "../../components/RowActions";
import type { MaterialUnit } from "../api/units";

interface UnitsTableProps {
  units: MaterialUnit[];
  isNepali: boolean;
  onEdit: (unit: MaterialUnit) => void;
  onDelete: (unitId: string) => void;
}

const rowClassName = "h-16 transition-colors hover:bg-background/80";
const cellClassName = "px-5 py-3 md:px-6";

export function UnitsTable({
  units,
  isNepali,
  onEdit,
  onDelete,
}: UnitsTableProps) {
  const { t } = useTranslation();

  return (
    <DataTable
      headers={[
        t("dashboard.superAdminPages.no"),
        t("dashboard.superAdminPages.fullNameNp"),
        t("dashboard.superAdminPages.fullNameEn"),
        t("dashboard.superAdminPages.abbreviation"),
        t("dashboard.superAdminPages.unitType"),
        t("dashboard.superAdminPages.createdAt"),
        t("dashboard.superAdminPages.action"),
      ]}
      empty={!units.length}
      emptyLabel={t("dashboard.superAdminPages.nothingFound")}
      recordLabel={t("dashboard.superAdminPages.recordCount", {
        count: units.length,
      })}
      minWidth={880}
    >
      {units.map((item, index) => (
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
          <td className={`${cellClassName} whitespace-nowrap`}>
            <span             className="rounded border border-border bg-background px-3 py-1.5 font-mono text-sm font-semibold">
              {item.abbreviation}
            </span>
          </td>
          <td className={`${cellClassName} whitespace-nowrap text-text-muted`}>
            {isNepali
              ? item.unitCategoryNameNp ?? "—"
              : item.unitCategoryNameEn ?? "—"}
          </td>
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
