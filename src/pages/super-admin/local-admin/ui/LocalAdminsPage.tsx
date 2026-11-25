import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DeleteDialog } from "../../components/DeleteDialog";
import { ModuleToolbar } from "../../components/ModuleToolbar";
import { Toast } from "../../components/Toast";
import { useSuperAdminToast } from "../../components/useSuperAdminToast";
import {
  useSuperAdminMockData,
  type MockAdmin,
} from "../../model/mock-data";
import {
  InviteFormDialog,
  type InviteValues,
} from "../components/InviteFormDialog";
import { LocalAdminsTable } from "../components/LocalAdminsTable";

export function LocalAdminsPage() {
  const { t, i18n } = useTranslation();
  const admins = useSuperAdminMockData((state) => state.admins);
  const setAdmins = useSuperAdminMockData((state) => state.setAdmins);
  const [search, setSearch] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { message, showToast } = useSuperAdminToast();
  const isNepali = i18n.language.startsWith("ne");

  const filteredAdmins = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return admins.filter((admin) =>
      `${admin.nameEn} ${admin.nameNp} ${admin.contact ?? ""} ${admin.email} ${admin.province ?? ""} ${admin.district ?? ""} ${admin.municipality ?? ""} ${admin.ward ?? ""} ${admin.regionEn} ${admin.regionNp}`
        .toLocaleLowerCase()
        .includes(query),
    );
  }, [admins, search]);

  function saveInvite(values: InviteValues) {
    const today = new Date().toISOString().slice(0, 10);
    const region = [
      values.province,
      values.district,
      values.municipality,
      values.ward,
    ]
      .map((value) => value.trim())
      .filter(Boolean)
      .join(", ");
    const admin: MockAdmin = {
      id: Date.now(),
      nameEn: values.nameEn.trim(),
      nameNp: values.nameNp.trim(),
      contact: values.contact.trim(),
      email: values.email.trim(),
      province: values.province.trim(),
      district: values.district.trim(),
      municipality: values.municipality.trim(),
      ward: values.ward.trim(),
      regionEn: region,
      regionNp: region,
      status: "Pending invite",
      dateEn: today,
      dateNp: today,
    };
    setAdmins((current) => [admin, ...current]);
    setInviteOpen(false);
    showToast(t("dashboard.superAdminPages.saved"));
  }

  function confirmDelete() {
    if (deleteId === null) return;
    setAdmins((current) => current.filter((admin) => admin.id !== deleteId));
    setDeleteId(null);
    showToast(t("dashboard.superAdminPages.deleted"));
  }

  return (
    <section className="w-full min-w-0 space-y-6 md:space-y-7">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-bold leading-tight text-text md:text-[34px]">
          {t("dashboard.moduleNames.superAdmin.localAdmin")}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-text-muted">
          {t("dashboard.superAdminPages.adminsDescription")}
        </p>
      </header>
      <ModuleToolbar
        onSearch={setSearch}
        actionLabel={t("dashboard.superAdminPages.sendInvitation")}
        actionIcon={<Send size={18} aria-hidden="true" />}
        onAction={() => setInviteOpen(true)}
      />
      <LocalAdminsTable
        admins={filteredAdmins}
        isNepali={isNepali}
        onResendInvite={(email) =>
          showToast(`${t("dashboard.superAdminPages.inviteSent")}: ${email}`)
        }
        onRevoke={setDeleteId}
      />
      {inviteOpen && (
        <InviteFormDialog
          onClose={() => setInviteOpen(false)}
          onSave={saveInvite}
        />
      )}
      {deleteId !== null && (
        <DeleteDialog
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
        />
      )}
      <Toast message={message} />
    </section>
  );
}
