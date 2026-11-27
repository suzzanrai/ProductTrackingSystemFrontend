import { DashboardField } from "@shared/ui";

const fieldClassName =
  "h-12 w-full rounded-control border border-border bg-surface px-4 text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onDirty: () => void;
  required?: boolean;
  type?: string;
  min?: number;
  step?: string;
}

export function Field({
  label,
  value,
  onChange,
  onDirty,
  required = true,
  type = "text",
  min,
  step,
}: FieldProps) {
  return (
    <DashboardField
      label={label}
      type={type}
      value={value}
      onChange={(event) => {
        onDirty();
        onChange(event.target.value);
      }}
      required={required}
      min={min}
      step={step}
      className={fieldClassName}
    />
  );
}

export { fieldClassName };
