import { CheckCircle2, Clock3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DataTable } from "../../components/DataTable";
import type { LocalAdmin } from "../api/local-admins";

export function LocalAdminsTable({ admins, isNepali }: { admins: LocalAdmin[]; isNepali: boolean }) {
  const { t } = useTranslation();
  return <DataTable headers={[t("dashboard.superAdminPages.no"), t("dashboard.superAdminPages.officerName"), t("dashboard.superAdminPages.emailContact"), t("dashboard.superAdminPages.municipality"), t("dashboard.superAdminPages.statusLabel")]} empty={!admins.length} emptyLabel={t("dashboard.superAdminPages.nothingFound")} recordLabel={t("dashboard.superAdminPages.recordCount", { count: admins.length })} minWidth={760}>
    {admins.map((admin, index) => <tr key={admin.userId} className="h-16 transition-colors hover:bg-background/80">
      <td className="px-5 py-3 font-mono text-sm text-text-muted">{index + 1}</td>
      <td className="px-5 py-3 font-semibold">{admin.firstName} {admin.lastName}</td>
      <td className="px-5 py-3 text-sm text-text-muted"><span className="block font-mono">{admin.email}</span>{admin.contact && <span>{admin.contact}</span>}</td>
      <td className="px-5 py-3 text-sm text-text-muted">#{admin.municipalityId}</td>
      <td className="px-5 py-3"><span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${admin.verificationStatus ? "bg-success-bg text-success-text" : "bg-warning-bg text-warning-text"}`}>{admin.verificationStatus ? <CheckCircle2 size={14} /> : <Clock3 size={14} />}{admin.verificationStatus ? (isNepali ? "प्रमाणित" : "Verified") : (isNepali ? "प्रमाणित छैन" : "Unverified")}</span></td>
    </tr>)}
  </DataTable>;
}
