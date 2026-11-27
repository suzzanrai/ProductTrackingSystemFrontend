import { useMemo, useState } from "react";
import { UserPlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getApiErrorMessage } from "../../api/response";
import { ApiStatus } from "../../components/ApiStatus";
import { ModuleToolbar } from "../../components/ModuleToolbar";
import { Toast } from "../../components/Toast";
import { useSuperAdminToast } from "../../components/useSuperAdminToast";
import { useCreateLocalAdmin, useDistricts, useLocalAdmins, useMunicipalities, useProvinces } from "../api/local-admins";
import { InviteFormDialog, type InviteValues } from "../components/InviteFormDialog";
import { LocalAdminsTable } from "../components/LocalAdminsTable";

export function LocalAdminsPage() {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [provinceId, setProvinceId] = useState<number | null>(null);
  const [districtId, setDistrictId] = useState<number | null>(null);
  const adminsQuery = useLocalAdmins(pageNumber);
  const provincesQuery = useProvinces();
  const districtsQuery = useDistricts(provinceId);
  const municipalitiesQuery = useMunicipalities(districtId);
  const createAdmin = useCreateLocalAdmin();
  const { message, showToast } = useSuperAdminToast();
  const isNepali = i18n.language.startsWith("ne");
  const admins = useMemo(() => (adminsQuery.data?.items ?? []).filter((admin) => `${admin.firstName} ${admin.lastName} ${admin.contact ?? ""} ${admin.email}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())), [adminsQuery.data, search]);

  async function saveInvite(values: InviteValues) {
    try {
      await createAdmin.mutateAsync(values);
      setInviteOpen(false);
      setPageNumber(1);
      setProvinceId(null);
      setDistrictId(null);
      showToast(t("dashboard.superAdminPages.saved"));
    } catch (error) {
      showToast(getApiErrorMessage(error) ?? t("dashboard.superAdminPages.saveFailed"));
    }
  }

  return <section className="w-full min-w-0 space-y-6 md:space-y-7">
    <header className="space-y-1.5"><h1 className="text-2xl font-bold leading-tight text-text">{t("dashboard.moduleNames.superAdmin.localAdmin")}</h1><p className="max-w-2xl text-sm leading-6 text-text-muted">{t("dashboard.superAdminPages.adminsDescription")}</p></header>
    <ModuleToolbar onSearch={setSearch} actionLabel={t("dashboard.superAdminPages.addLocalAdmin")} actionIcon={<UserPlus size={18} aria-hidden="true" />} onAction={() => setInviteOpen(true)} actionDisabled={Boolean(adminsQuery.error)} />
    <ApiStatus loading={adminsQuery.isLoading} error={adminsQuery.error} onRetry={() => void adminsQuery.refetch()} />
    {!adminsQuery.isLoading && !adminsQuery.error && <>
      <LocalAdminsTable admins={admins} isNepali={isNepali} />
      {adminsQuery.data && adminsQuery.data.totalPages > 1 && <nav aria-label={t("dashboard.superAdminPages.pagination")} className="flex items-center justify-end gap-3 text-sm"><button type="button" disabled={pageNumber <= 1} onClick={() => setPageNumber((page) => page - 1)} className="rounded-control border border-border px-3 py-2 disabled:opacity-40">{t("dashboard.superAdminPages.previous")}</button><span className="text-text-muted">{adminsQuery.data.pageNumber} / {adminsQuery.data.totalPages}</span><button type="button" disabled={pageNumber >= adminsQuery.data.totalPages} onClick={() => setPageNumber((page) => page + 1)} className="rounded-control border border-border px-3 py-2 disabled:opacity-40">{t("dashboard.superAdminPages.next")}</button></nav>}
    </>}
    {inviteOpen && <InviteFormDialog onClose={() => setInviteOpen(false)} onSave={(values) => void saveInvite(values)} provinces={provincesQuery.data ?? []} districts={districtsQuery.data ?? []} municipalities={municipalitiesQuery.data ?? []} provinceId={provinceId} districtId={districtId} onProvinceChange={(id) => { setProvinceId(id); setDistrictId(null); }} onDistrictChange={(id) => setDistrictId(id)} isSaving={createAdmin.isPending} isNepali={isNepali} />}
    <Toast message={message} />
  </section>;
}
