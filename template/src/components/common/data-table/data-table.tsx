"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type OnChangeFn,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableRowSelection?: boolean;
  enablePagination?: boolean;
  manualPagination?: boolean;
  rowCount?: number;
  pageSizeOptions?: number[];
  onRowClick?: (row: TData) => void;
  emptyMessage?: string;
  // External state handlers for controlled mode
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  enableSorting = false,
  enableFiltering = false,
  enableRowSelection = false,
  enablePagination = false,
  manualPagination = false,
  rowCount,
  pageSizeOptions,
  onRowClick,
  emptyMessage = "데이터가 없습니다.",
  sorting: sortingProp,
  onSortingChange,
  columnFilters: columnFiltersProp,
  onColumnFiltersChange,
  pagination: paginationProp,
  onPaginationChange,
  rowSelection: rowSelectionProp,
  onRowSelectionChange,
  columnVisibility: columnVisibilityProp,
  onColumnVisibilityChange,
}: DataTableProps<TData, TValue>) {
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(
    []
  );
  const [internalColumnFilters, setInternalColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [internalRowSelection, setInternalRowSelection] =
    React.useState<RowSelectionState>({});
  const [internalColumnVisibility, setInternalColumnVisibility] =
    React.useState<VisibilityState>({});
  const [internalPagination, setInternalPagination] =
    React.useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data,
    columns,
    rowCount: manualPagination ? rowCount : undefined,
    state: {
      sorting: sortingProp ?? internalSorting,
      columnFilters: columnFiltersProp ?? internalColumnFilters,
      rowSelection: rowSelectionProp ?? internalRowSelection,
      columnVisibility: columnVisibilityProp ?? internalColumnVisibility,
      pagination: paginationProp ?? internalPagination,
    },
    onSortingChange: onSortingChange ?? setInternalSorting,
    onColumnFiltersChange: onColumnFiltersChange ?? setInternalColumnFilters,
    onRowSelectionChange: onRowSelectionChange ?? setInternalRowSelection,
    onColumnVisibilityChange:
      onColumnVisibilityChange ?? setInternalColumnVisibility,
    onPaginationChange: onPaginationChange ?? setInternalPagination,
    getCoreRowModel: getCoreRowModel(),
    ...(enableSorting && { getSortedRowModel: getSortedRowModel() }),
    ...(enableFiltering && { getFilteredRowModel: getFilteredRowModel() }),
    ...(enablePagination &&
      !manualPagination && {
        getPaginationRowModel: getPaginationRowModel(),
      }),
    enableRowSelection,
    manualPagination,
  });

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="hover:bg-table-header cursor-default"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    header.column.columnDef.meta?.headerClassName ??
                      header.column.columnDef.meta?.className
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                onKeyDown={
                  onRowClick
                    ? (e) => {
                        if (e.key === "Enter") onRowClick(row.original);
                      }
                    : undefined
                }
                tabIndex={onRowClick ? 0 : undefined}
                role={onRowClick ? "link" : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(cell.column.columnDef.meta?.className)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {enablePagination && (
        <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />
      )}
    </div>
  );
}
