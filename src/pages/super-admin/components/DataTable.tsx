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
    <div className="w-full min-w-0 overflow-hidden rounded-card border border-border bg-surface">
      <div className="flex min-h-12 items-center justify-between border-b border-border px-5 md:px-6">
        <p className="text-sm font-medium text-text-muted">{recordLabel}</p>
      </div>
      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse text-left text-[15px]"
          style={{ minWidth }}
        >
          <thead>
            <tr className="h-12 border-b border-border bg-background text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
              {headers.map((header, index) => (
                <th
                  key={header}
                  scope="col"
                  className={`whitespace-nowrap px-5 py-3.5 md:px-6 ${
                    index === 0 ? "w-16" : ""
                  } ${index === headers.length - 1 ? "w-36 text-right" : ""}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm leading-6 text-text">
            {children}
          </tbody>
        </table>
      </div>
      {empty && (
        <div className="p-12 text-center text-base text-text-muted">
          <Search className="mx-auto mb-3 size-9 opacity-50" aria-hidden="true" />
          <p>{emptyLabel}</p>
        </div>
      )}
    </div>
  );
}
