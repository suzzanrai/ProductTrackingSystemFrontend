import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Field, fieldClassName } from "../../components/Field";
import { FormDialog } from "../../components/FormDialog";
import type { MockUnit } from "../../model/mock-data";

export type UnitValues = Omit<MockUnit, "id">;

interface UnitFormDialogProps {
  unit: MockUnit | null;
  onClose: () => void;
  onSave: (values: UnitValues) => void;
}

export function UnitFormDialog({
  unit,
  onClose,
  onSave,
}: UnitFormDialogProps) {
  const { t } = useTranslation();
  const [nameEn, setNameEn] = useState(unit?.nameEn ?? "");
  const [nameNp, setNameNp] = useState(unit?.nameNp ?? "");
  const [shortEn, setShortEn] = useState(unit?.shortEn ?? "");
  const [shortNp, setShortNp] = useState(unit?.shortNp ?? "");
  const [type, setType] = useState(unit?.type ?? "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (type !== "Weight" && type !== "Volume" && type !== "Count") return;
    onSave({ nameEn: nameEn.trim(), nameNp: nameNp.trim(), shortEn: shortEn.trim(), shortNp: shortNp.trim(), type });
  }

  return (
    <FormDialog
      title={t(`dashboard.superAdminPages.${unit ? "editUnit" : "addUnit"}`)}
      submitLabel={t(unit ? "dashboard.superAdminPages.update" : "common.save")}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {(markDirty) => (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label={t("dashboard.superAdminPages.fullNameEn")} value={nameEn} onChange={setNameEn} onDirty={markDirty} />
            <Field label={t("dashboard.superAdminPages.fullNameNp")} value={nameNp} onChange={setNameNp} onDirty={markDirty} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label={t("dashboard.superAdminPages.shortNameEn")} value={shortEn} onChange={setShortEn} onDirty={markDirty} />
            <Field label={t("dashboard.superAdminPages.shortNameNp")} value={shortNp} onChange={setShortNp} onDirty={markDirty} />
          </div>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-text-muted">
              {t("dashboard.superAdminPages.unitType")} *
            </span>
            <select
              required
              value={type}
              onChange={(event) => {
                markDirty();
                setType(event.target.value);
              }}
              className={fieldClassName}
            >
              <option value="">{t("dashboard.superAdminPages.selectUnitType")}</option>
              {(["Weight", "Volume", "Count"] as const).map((unitType) => (
                <option key={unitType} value={unitType}>
                  {t(`dashboard.superAdminPages.unitTypes.${unitType}`)}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
    </FormDialog>
  );
}
