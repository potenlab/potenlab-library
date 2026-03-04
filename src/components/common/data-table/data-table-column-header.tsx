"use client";

import { ArrowUpDown } from "lucide-react";
import type { Column } from "@tanstack/react-table";
import { cn } from "../../../lib/utils";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <button
      type="button"
      className={cn("flex items-center gap-1", className)}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="size-4 text-table-cell" />
    </button>
  );
}
