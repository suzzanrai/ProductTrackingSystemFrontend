import { CheckCircle2, Clock3, Send, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DataTable } from "../../components/DataTable";
import type { MockAdmin } from "../../model/mock-data";

interface LocalAdminsTableProps {
  admins: MockAdmin[];
  isNepali: boolean;
  onResendInvite: (email: string) => void;
  onRevoke: (adminId: number) => void;
}

const rowClassName = "h-16 transition-colors hover:bg-background/80";
const cellClassName = "px-5 py-3 md:px-6";

export function LocalAdminsTable({
  admins,
  isNepali,
  onResendInvite,
  onRevoke,
}: LocalAdminsTableProps) {
  const { t } = useTranslation();

  return (
    <DataTable
      headers={[
        t("dashboard.superAdminPages.no"),
        t("dashboard.superAdminPages.officerName"),
        t("dashboard.superAdminPages.emailContact"),
        t("dashboard.superAdminPages.region"),
        t("dashboard.superAdminPages.statusLabel"),
        t("dashboard.superAdminPages.invitedDate"),
        t("dashboard.superAdminPages.action"),
      ]}
      empty={!admins.length}
      emptyLabel={t("dashboard.superAdminPages.nothingFound")}
      recordLabel={t("dashboard.superAdminPages.recordCount", {
        count: admins.length,
      })}
      minWidth={1000}
    >
      {admins.map((item, index) => {
        const name = isNepali ? item.nameNp : item.nameEn;
        const regionParts = [
          item.province,
          item.district,
          item.municipality,
          item.ward,
        ].filter(Boolean);
        const region = regionParts.length
          ? regionParts.join(", ")
          : isNepali
            ? item.regionNp
            : item.regionEn;
        const date = isNepali ? item.dateNp : item.dateEn;
        const active = item.status === "Active";

        return (
          <tr key={item.id} className={rowClassName}>
            <td className={`${cellClassName} whitespace-nowrap font-mono text-sm text-text-muted`}>
              {index + 1}
            </td>
            <td className={`${cellClassName} whitespace-nowrap font-semibold`}>
              <span               className="mr-2.5 inline-flex size-9 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
                {item.nameEn.charAt(0)}
              </span>
              {name}
            </td>
            <td className={`${cellClassName} whitespace-nowrap text-sm text-text-muted`}>
              <span className="block font-mono">{item.email}</span>
              {item.contact && (
                <span className="mt-1 block">{item.contact}</span>
              )}
            </td>
            <td className={`${cellClassName} whitespace-nowrap`}>{region}</td>
            <td className={`${cellClassName} whitespace-nowrap`}>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  active
                    ? "bg-success-bg text-success-text"
                    : "bg-warning-bg text-warning-text"
                }`}
              >
                {active ? (
                  <CheckCircle2 size={14} aria-hidden="true" />
                ) : (
                  <Clock3 size={14} aria-hidden="true" />
                )}
                {t(`dashboard.superAdminPages.status.${item.status}`)}
              </span>
            </td>
            <td className={`${cellClassName} whitespace-nowrap font-mono text-sm text-text-muted`}>
              {date}
            </td>
            <td className={cellClassName}>
              <div className="flex items-center justify-end gap-1">
                <button
                  type="button"
                  title={t("dashboard.superAdminPages.resendInvite")}
                  aria-label={t("dashboard.superAdminPages.resendInvite")}
                  onClick={() => onResendInvite(item.email)}
                  className="flex size-9 items-center justify-center rounded-control text-text-muted hover:bg-background hover:text-primary"
                >
                  <Send size={17} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  title={t("dashboard.superAdminPages.revoke")}
                  aria-label={t("dashboard.superAdminPages.revoke")}
                  onClick={() => onRevoke(item.id)}
                  className="flex size-9 items-center justify-center rounded-control text-text-muted hover:bg-danger-bg hover:text-danger"
                >
                  <Trash2 size={17} aria-hidden="true" />
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </DataTable>
  );
}
