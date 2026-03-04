"use client";

import type { Table } from "@tanstack/react-table";
import { Input } from "../../ui/input";
import { cn } from "../../../lib/utils";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchPlaceholder?: string;
  searchColumnId?: string;
  className?: string;
  children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = "Search...",
  searchColumnId,
  className,
  children,
}: DataTableToolbarProps<TData>) {
  const filterValue = searchColumnId
    ? (table.getColumn(searchColumnId)?.getFilterValue() as string) ?? ""
    : "";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {searchColumnId && (
        <Input
          className="h-12 rounded-md flex-1"
          placeholder={searchPlaceholder}
          value={filterValue}
          onChange={(e) =>
            table.getColumn(searchColumnId)?.setFilterValue(e.target.value)
          }
          aria-label={searchPlaceholder}
        />
      )}
      {children}
    </div>
  );
}
