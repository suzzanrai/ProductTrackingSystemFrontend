import { Search } from "lucide-react";
import type { ReactNode } from "react";

interface DataTableProps {
  headers: string[];
  children: ReactNode;
  empty: boolean;
  emptyLabel: string;
  recordLabel: string;
  minWidth: number;
}

export function DataTable({
  headers,
  children,
  empty,
  emptyLabel,
  recordLabel,
  minWidth,
}: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface">
      <div className="flex min-h-11 items-center justify-between border-b border-border px-4 md:px-5">
        <p className="text-xs font-medium text-text-muted">{recordLabel}</p>
      </div>
      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse text-left text-sm"
          style={{ minWidth }}
        >
          <thead>
            <tr className="h-11 border-b border-border bg-background text-left text-[11px] font-semibold uppercase tracking-wide text-text-muted">
              {headers.map((header, index) => (
                <th
                  key={header}
                  scope="col"
                  className={`whitespace-nowrap px-4 py-3 md:px-5 ${
                    index === 0 ? "w-16" : ""
                  } ${index === headers.length - 1 ? "w-36 text-right" : ""}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-[13px] leading-5 text-text">
            {children}
          </tbody>
        </table>
      </div>
      {empty && (
        <div className="p-10 text-center text-sm text-text-muted">
          <Search className="mx-auto mb-2 size-8 opacity-50" aria-hidden="true" />
          <p>{emptyLabel}</p>
        </div>
      )}
    </div>
  );
}
