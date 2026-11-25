import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Field } from "../../components/Field";
import { FormDialog } from "../../components/FormDialog";

export interface InviteValues {
  nameEn: string;
  nameNp: string;
  contact: string;
  email: string;
  password: string;
  province: string;
  district: string;
  municipality: string;
  ward: string;
}

interface InviteFormDialogProps {
  onClose: () => void;
  onSave: (values: InviteValues) => void;
}

const initialValues: InviteValues = {
  nameEn: "",
  nameNp: "",
  contact: "",
  email: "",
  password: "",
  province: "",
  district: "",
  municipality: "",
  ward: "",
};

export function InviteFormDialog({
  onClose,
  onSave,
}: InviteFormDialogProps) {
  const { t } = useTranslation();
  const [values, setValues] = useState(initialValues);

  function update(key: keyof InviteValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(values);
  }

  return (
    <FormDialog
      title={t("dashboard.superAdminPages.sendInvitation")}
      submitLabel={t("dashboard.superAdminPages.sendInvitation")}
      maxWidth="760px"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {(markDirty) => (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label={t("dashboard.superAdminPages.fullNameEn")} value={values.nameEn} onChange={(value) => update("nameEn", value)} onDirty={markDirty} />
            <Field label={t("dashboard.superAdminPages.fullNameNp")} value={values.nameNp} onChange={(value) => update("nameNp", value)} onDirty={markDirty} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label={t("dashboard.superAdminPages.contact")} value={values.contact} onChange={(value) => update("contact", value)} onDirty={markDirty} type="tel" />
            <Field label={t("dashboard.superAdminPages.emailAddress")} value={values.email} onChange={(value) => update("email", value)} onDirty={markDirty} type="email" />
          </div>
          <Field label={t("dashboard.superAdminPages.password")} value={values.password} onChange={(value) => update("password", value)} onDirty={markDirty} type="password" />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label={t("dashboard.superAdminPages.province")} value={values.province} onChange={(value) => update("province", value)} onDirty={markDirty} />
            <Field label={t("dashboard.superAdminPages.district")} value={values.district} onChange={(value) => update("district", value)} onDirty={markDirty} />
            <Field label={t("dashboard.superAdminPages.municipality")} value={values.municipality} onChange={(value) => update("municipality", value)} onDirty={markDirty} />
            <Field label={t("dashboard.superAdminPages.ward")} value={values.ward} onChange={(value) => update("ward", value)} onDirty={markDirty} type="number" />
          </div>
          <p className="text-xs text-text-muted">
            {t("dashboard.superAdminPages.inviteHelp")}
          </p>
        </>
      )}
    </FormDialog>
  );
}
