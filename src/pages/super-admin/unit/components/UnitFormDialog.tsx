import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Field, fieldClassName } from "../../components/Field";
import { FormDialog } from "../../components/FormDialog";
import type { MaterialUnit, MaterialUnitWrite, UnitCategory } from "../api/units";

export type UnitValues = MaterialUnitWrite;

interface UnitFormDialogProps {
  unit: MaterialUnit | null;
  categories: UnitCategory[];
  onClose: () => void;
  onSave: (values: UnitValues) => void;
}

export function UnitFormDialog({
  unit,
  categories,
  onClose,
  onSave,
}: UnitFormDialogProps) {
  const { t, i18n } = useTranslation();
  const isNepali = i18n.language.startsWith("ne");
  const [nameEn, setNameEn] = useState(unit?.nameEn ?? "");
  const [nameNp, setNameNp] = useState(unit?.nameNp ?? "");
  const [abbreviation, setAbbreviation] = useState(unit?.abbreviation ?? "");
  const [unitCategoryId, setUnitCategoryId] = useState(
    unit?.unitCategoryId ?? "",
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!unitCategoryId) return;
    onSave({
      nameEn: nameEn.trim(),
      nameNp: nameNp.trim(),
      abbreviation: abbreviation.trim(),
      unitCategoryId,
    });
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
            <Field
              label={t("dashboard.superAdminPages.fullNameEn")}
              value={nameEn}
              onChange={setNameEn}
              onDirty={markDirty}
            />
            <Field
              label={t("dashboard.superAdminPages.fullNameNp")}
              value={nameNp}
              onChange={setNameNp}
              onDirty={markDirty}
            />
          </div>
          <Field
            label={t("dashboard.superAdminPages.abbreviation")}
            value={abbreviation}
            onChange={setAbbreviation}
            onDirty={markDirty}
          />
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-text-muted">
              {t("dashboard.superAdminPages.unitType")} *
            </span>
            <select
              required
              value={unitCategoryId}
              onChange={(event) => {
                markDirty();
                setUnitCategoryId(event.target.value);
              }}
              className={fieldClassName}
            >
              <option value="">
                {t("dashboard.superAdminPages.selectUnitType")}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {isNepali ? category.nameNp : category.nameEn}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
    </FormDialog>
  );
}
