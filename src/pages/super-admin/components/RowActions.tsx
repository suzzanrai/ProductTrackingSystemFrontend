import { Edit2, Trash2 } from "lucide-react";

interface RowActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  editLabel: string;
  deleteLabel: string;
}

export function RowActions({
  onEdit,
  onDelete,
  editLabel,
  deleteLabel,
}: RowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        onClick={onEdit}
        title={editLabel}
        aria-label={editLabel}
        className="flex size-9 items-center justify-center rounded-control text-text-muted transition-colors hover:bg-background hover:text-primary"
      >
        <Edit2 size={18} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        title={deleteLabel}
        aria-label={deleteLabel}
        className="flex size-9 items-center justify-center rounded-control text-text-muted transition-colors hover:bg-danger-bg hover:text-danger"
      >
        <Trash2 size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
