import { useTranslation } from "react-i18next";
import { fieldClassName } from "../../components/Field";
import type { MaterialUnit } from "../../unit/api/units";

export interface UnitAssignmentDraft {
  unitId: string;
  conversionFactorToBaseUnit: string;
}

interface ProductUnitSelectorProps {
  units: MaterialUnit[];
  assignments: UnitAssignmentDraft[];
  baseUnitId: string;
  onChange: (assignments: UnitAssignmentDraft[], baseUnitId: string) => void;
  onDirty: () => void;
}

export function ProductUnitSelector({
  units,
  assignments,
  baseUnitId,
  onChange,
  onDirty,
}: ProductUnitSelectorProps) {
  const { t, i18n } = useTranslation();
  const isNepali = i18n.language.startsWith("ne");

  function toggleUnit(unitId: string) {
    const isSelected = assignments.some((item) => item.unitId === unitId);
    const nextAssignments = isSelected
      ? assignments.filter((item) => item.unitId !== unitId)
      : [
          ...assignments,
          {
            unitId,
            conversionFactorToBaseUnit: baseUnitId ? "" : "1",
          },
        ];
    const nextBaseUnitId =
      isSelected && baseUnitId === unitId
        ? (nextAssignments[0]?.unitId ?? "")
        : baseUnitId || unitId;

    onDirty();
    onChange(
      nextAssignments.map((item) =>
        item.unitId === nextBaseUnitId
          ? { ...item, conversionFactorToBaseUnit: "1" }
          : item,
      ),
      nextBaseUnitId,
    );
  }

  return (
    <fieldset className="space-y-3 rounded-card border border-border p-4">
      <legend className="px-1 text-sm font-semibold text-text">
        {t("dashboard.superAdminPages.units")} *
      </legend>
      <p className="text-xs text-text-muted">
        {t("dashboard.superAdminPages.multipleUnits")}
      </p>
      <div className="flex flex-wrap gap-2">
        {units.map((unit) => {
          const selected = assignments.some((item) => item.unitId === unit.id);
          const name = isNepali ? unit.nameNp : unit.nameEn;
          return (
            <button
              key={unit.id}
              type="button"
              aria-pressed={selected}
              onClick={() => toggleUnit(unit.id)}
              className={`flex h-10 items-center gap-2 rounded-control border px-4 text-sm font-medium transition-colors ${
                selected
                  ? "border-primary bg-primary-light text-primary"
                  : "border-border bg-surface text-text hover:border-primary"
              }`}
            >
              {name} ({unit.abbreviation})
            </button>
          );
        })}
      </div>
      {assignments.length > 0 && (
        <div className="grid gap-3 rounded-control bg-background/50 p-3 lg:grid-cols-2">
          {assignments.map((assignment) => {
            const unit = units.find((item) => item.id === assignment.unitId);
            if (!unit) return null;

            const name = isNepali ? unit.nameNp : unit.nameEn;
            const isBaseUnit = assignment.unitId === baseUnitId;
            return (
              <div
                key={assignment.unitId}
                className="grid content-start gap-3 rounded-control border border-border bg-surface p-3"
              >
                <label className="flex items-center gap-2 text-sm text-text">
                  <input
                    type="radio"
                    name="material-base-unit"
                    checked={isBaseUnit}
                    onChange={() => {
                      onDirty();
                      onChange(
                        assignments.map((item) =>
                          item.unitId === assignment.unitId
                            ? { ...item, conversionFactorToBaseUnit: "1" }
                            : item,
                        ),
                        assignment.unitId,
                      );
                    }}
                    required
                  />
                  <span>
                    {name} ({unit.abbreviation}) —{" "}
                    {t("dashboard.superAdminPages.baseUnit")}
                  </span>
                </label>
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium text-text-muted">
                    {t("dashboard.superAdminPages.conversionFactor")}
                  </span>
                  <input
                    type="number"
                    min="0.0000001"
                    step="any"
                    required
                    disabled={isBaseUnit}
                    value={
                      isBaseUnit
                        ? "1"
                        : assignment.conversionFactorToBaseUnit
                    }
                    onChange={(event) => {
                      onDirty();
                      onChange(
                        assignments.map((item) =>
                          item.unitId === assignment.unitId
                            ? {
                                ...item,
                                conversionFactorToBaseUnit: event.target.value,
                              }
                            : item,
                        ),
                        baseUnitId,
                      );
                    }}
                    className={fieldClassName}
                  />
                  <span className="block text-xs text-text-muted">
                    {t("dashboard.superAdminPages.conversionFactorHelp")}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      )}
      {assignments.length === 0 && (
        <p className="text-xs text-danger">
          {t("dashboard.superAdminPages.chooseUnit")}
        </p>
      )}
    </fieldset>
  );
}
