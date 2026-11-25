import { useTranslation } from "react-i18next";
import { DataTable } from "../../components/DataTable";
import { RowActions } from "../../components/RowActions";
import type { MockUnit } from "../../model/mock-data";

interface UnitsTableProps {
  units: MockUnit[];
  isNepali: boolean;
  onEdit: (unit: MockUnit) => void;
  onDelete: (unitId: number) => void;
}

const rowClassName = "h-14 transition-colors hover:bg-background/80";
const cellClassName = "px-4 py-2.5 md:px-5";

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
        t("dashboard.superAdminPages.shortName"),
        t("dashboard.superAdminPages.unitType"),
        t("dashboard.superAdminPages.action"),
      ]}
      empty={!units.length}
      emptyLabel={t("dashboard.superAdminPages.nothingFound")}
      recordLabel={t("dashboard.superAdminPages.recordCount", {
        count: units.length,
      })}
      minWidth={800}
    >
      {units.map((item, index) => (
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
          <td className={`${cellClassName} whitespace-nowrap`}>
            <span className="rounded border border-border bg-background px-2.5 py-1 font-mono text-xs font-semibold">
              {isNepali ? item.shortNp : item.shortEn}
            </span>
          </td>
          <td className={`${cellClassName} whitespace-nowrap text-text-muted`}>
            {t(`dashboard.superAdminPages.unitTypes.${item.type}`)}
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
