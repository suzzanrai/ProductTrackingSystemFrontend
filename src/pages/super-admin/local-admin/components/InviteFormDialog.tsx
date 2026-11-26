import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Field } from "../../components/Field";
import { FormDialog } from "../../components/FormDialog";
import type { LocationOption } from "../api/local-admins";

export interface InviteValues {
  firstName: string;
  lastName: string;
  contact: string;
  email: string;
  password: string;
  municipalityId: number;
}

interface Props {
  onClose: () => void;
  onSave: (values: InviteValues) => void;
  provinces: LocationOption[];
  districts: LocationOption[];
  municipalities: LocationOption[];
  provinceId: number | null;
  districtId: number | null;
  onProvinceChange: (id: number | null) => void;
  onDistrictChange: (id: number | null) => void;
  isSaving: boolean;
  isNepali: boolean;
}

const initialValues: InviteValues = { firstName: "", lastName: "", contact: "", email: "", password: "", municipalityId: 0 };

export function InviteFormDialog(props: Props) {
  const { t } = useTranslation();
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const name = (item: LocationOption) => props.isNepali ? item.nameNp : item.nameEn;
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!values.municipalityId) { setError(t("dashboard.superAdminPages.municipality")); return; }
    setError("");
    props.onSave(values);
  }
  return <FormDialog title={t("dashboard.superAdminPages.addLocalAdmin")} submitLabel={t("dashboard.superAdminPages.addLocalAdmin")} maxWidth="760px" onClose={props.onClose} onSubmit={handleSubmit}>
    {(markDirty) => <>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={props.isNepali ? "पहिलो नाम" : "First name"} value={values.firstName} onChange={(firstName) => setValues((v) => ({ ...v, firstName }))} onDirty={markDirty} />
        <Field label={props.isNepali ? "थर" : "Last name"} value={values.lastName} onChange={(lastName) => setValues((v) => ({ ...v, lastName }))} onDirty={markDirty} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={t("dashboard.superAdminPages.contact")} value={values.contact} onChange={(contact) => setValues((v) => ({ ...v, contact }))} onDirty={markDirty} type="tel" />
        <Field label={t("dashboard.superAdminPages.emailAddress")} value={values.email} onChange={(email) => setValues((v) => ({ ...v, email }))} onDirty={markDirty} type="email" />
      </div>
      <Field label={t("dashboard.superAdminPages.password")} value={values.password} onChange={(password) => setValues((v) => ({ ...v, password }))} onDirty={markDirty} type="password" />
      <div className="grid gap-4 md:grid-cols-3">
        {[{ label: t("dashboard.superAdminPages.province"), value: props.provinceId, options: props.provinces, change: props.onProvinceChange }, { label: t("dashboard.superAdminPages.district"), value: props.districtId, options: props.districts, change: props.onDistrictChange }, { label: t("dashboard.superAdminPages.municipality"), value: values.municipalityId || "", options: props.municipalities, change: (id: number | null) => setValues((v) => ({ ...v, municipalityId: id ?? 0 })) }].map((select) => <label key={select.label} className="block space-y-1.5 text-sm font-medium text-text">{select.label}<select className="w-full rounded-control border border-border bg-surface px-3 py-2.5" value={select.value ?? ""} onChange={(event) => select.change(event.target.value ? Number(event.target.value) : null)}><option value="">{select.label}</option>{select.options.map((option) => <option key={option.id} value={option.id}>{name(option)}</option>)}</select></label>)}
      </div>
      {error && <p role="alert" className="text-sm text-danger">{error}</p>}
      {props.isSaving && <p className="text-xs text-text-muted" role="status">Saving…</p>}
    </>}
  </FormDialog>;
}
