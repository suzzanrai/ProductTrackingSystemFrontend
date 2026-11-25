import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { FormDialog } from "../../components/FormDialog";
import { Field, fieldClassName } from "../../components/Field";
import type { MaterialCategory } from "../../categories/api/categories";
import type { Material, MaterialWrite } from "../api/materials";
import type { MaterialUnit } from "../../unit/api/units";
import {
  ProductUnitSelector,
  type UnitAssignmentDraft,
} from "./ProductUnitSelector";

export type ProductValues = MaterialWrite;

interface ProductFormDialogProps {
  product: Material | null;
  categories: MaterialCategory[];
  units: MaterialUnit[];
  onClose: () => void;
  onSave: (values: ProductValues) => void;
}

export function ProductFormDialog({
  product,
  categories,
  units,
  onClose,
  onSave,
}: ProductFormDialogProps) {
  const { t, i18n } = useTranslation();
  const isNepali = i18n.language.startsWith("ne");
  const [code, setCode] = useState(product?.code ?? "");
  const [nameEn, setNameEn] = useState(product?.nameEn ?? "");
  const [nameNp, setNameNp] = useState(product?.nameNp ?? "");
  const [categoryId, setCategoryId] = useState(
    product?.materialCategoryId ?? "",
  );
  const [description, setDescription] = useState(product?.description ?? "");
  const [isBatchTracked, setIsBatchTracked] = useState(
    product?.isBatchTracked ?? false,
  );
  const [isSerialTracked, setIsSerialTracked] = useState(
    product?.isSerialTracked ?? false,
  );
  const [minimumStockLevel, setMinimumStockLevel] = useState(
    String(product?.minimumStockLevel ?? 0),
  );
  const [reorderLevel, setReorderLevel] = useState(
    String(product?.reorderLevel ?? 0),
  );
  const initialAssignments: UnitAssignmentDraft[] =
    product?.units.map((unit) => ({
      unitId: unit.unitId,
      conversionFactorToBaseUnit: String(unit.conversionFactorToBaseUnit),
    })) ?? [];
  const [unitAssignments, setUnitAssignments] =
    useState<UnitAssignmentDraft[]>(initialAssignments);
  const [baseUnitId, setBaseUnitId] = useState(
    product?.units.find((unit) => unit.isBaseUnit)?.unitId ??
      initialAssignments[0]?.unitId ??
      "",
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!categoryId || unitAssignments.length === 0 || !baseUnitId) return;

    const minimumStock = Number(minimumStockLevel);
    const reorder = Number(reorderLevel);
    if (
      !Number.isFinite(minimumStock) ||
      minimumStock < 0 ||
      !Number.isFinite(reorder) ||
      reorder < 0
    ) {
      return;
    }

    const hasInvalidFactor = unitAssignments.some((assignment) => {
      if (assignment.unitId === baseUnitId) return false;
      const factor = Number(assignment.conversionFactorToBaseUnit);
      return !Number.isFinite(factor) || factor <= 0;
    });
    if (hasInvalidFactor) return;

    const assignedUnits = unitAssignments.map((assignment) => {
      return {
        unitId: assignment.unitId,
        conversionFactorToBaseUnit:
          assignment.unitId === baseUnitId
            ? 1
            : Number(assignment.conversionFactorToBaseUnit),
        isBaseUnit: assignment.unitId === baseUnitId,
      };
    });

    onSave({
      code: code.trim(),
      nameEn: nameEn.trim(),
      nameNp: nameNp.trim(),
      materialCategoryId: categoryId,
      isBatchTracked,
      isSerialTracked,
      minimumStockLevel: minimumStock,
      reorderLevel: reorder,
      description: description.trim(),
      units: assignedUnits,
    });
  }

  return (
    <FormDialog
      title={t(
        `dashboard.superAdminPages.${product ? "editProduct" : "addProduct"}`,
      )}
      submitLabel={t(
        product ? "dashboard.superAdminPages.update" : "common.save",
      )}
      maxWidth="760px"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {(markDirty) => (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label={t("dashboard.superAdminPages.productCode")}
              value={code}
              onChange={setCode}
              onDirty={markDirty}
            />
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-text-muted">
                {t("dashboard.superAdminPages.category")} *
              </span>
              <select
                required
                value={categoryId}
                onChange={(event) => {
                  markDirty();
                  setCategoryId(event.target.value);
                }}
                className={fieldClassName}
              >
                <option value="">
                  {t("dashboard.superAdminPages.selectCategory")}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {isNepali ? category.nameNp : category.nameEn}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label={t("dashboard.superAdminPages.nameEn")}
              value={nameEn}
              onChange={setNameEn}
              onDirty={markDirty}
            />
            <Field
              label={t("dashboard.superAdminPages.nameNp")}
              value={nameNp}
              onChange={setNameNp}
              onDirty={markDirty}
            />
          </div>
          <ProductUnitSelector
            units={units}
            assignments={unitAssignments}
            baseUnitId={baseUnitId}
            onChange={(assignments, nextBaseUnitId) => {
              setUnitAssignments(assignments);
              setBaseUnitId(nextBaseUnitId);
            }}
            onDirty={markDirty}
          />
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-text-muted">
              {t("dashboard.superAdminPages.description")}
            </span>
            <textarea
              rows={3}
              value={description}
              onChange={(event) => {
                markDirty();
                setDescription(event.target.value);
              }}
              className="w-full rounded-control border border-border bg-surface p-3 text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label={t("dashboard.superAdminPages.minimumStockLevel")}
              value={minimumStockLevel}
              onChange={setMinimumStockLevel}
              onDirty={markDirty}
              type="number"
              min={0}
              step="any"
            />
            <Field
              label={t("dashboard.superAdminPages.reorderLevel")}
              value={reorderLevel}
              onChange={setReorderLevel}
              onDirty={markDirty}
              type="number"
              min={0}
              step="any"
            />
          </div>
          <div className="flex flex-wrap gap-5">
            <label className="flex items-center gap-2 text-sm text-text">
              <input
                type="checkbox"
                checked={isBatchTracked}
                onChange={(event) => {
                  markDirty();
                  setIsBatchTracked(event.target.checked);
                }}
              />
              {t("dashboard.superAdminPages.batchTracked")}
            </label>
            <label className="flex items-center gap-2 text-sm text-text">
              <input
                type="checkbox"
                checked={isSerialTracked}
                onChange={(event) => {
                  markDirty();
                  setIsSerialTracked(event.target.checked);
                }}
              />
              {t("dashboard.superAdminPages.serialTracked")}
            </label>
          </div>
        </>
      )}
    </FormDialog>
  );
}
