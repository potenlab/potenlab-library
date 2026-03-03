"use client";

import * as React from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 50],
}: DataTablePaginationProps<TData>) {
  const [pageJumpInput, setPageJumpInput] = React.useState("");

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  function handlePageJump() {
    const page = parseInt(pageJumpInput, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      table.setPageIndex(page - 1);
      setPageJumpInput("");
    }
  }

  function handlePageJumpKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handlePageJump();
    }
  }

  return (
    <div className="flex items-center justify-between">
      {/* Left group: pagination buttons + page indicator */}
      <div className="flex items-center gap-2">
        <Button
          variant="pagination"
          size="pagination"
          aria-label="Go to first page"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
        >
          <ChevronsLeft className="size-5" />
        </Button>

        <Button
          variant="pagination"
          size="pagination"
          aria-label="Previous page"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <ChevronLeft className="size-5" />
        </Button>

        <Button
          variant="pagination"
          size="pagination"
          aria-label="Next page"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          <ChevronRight className="size-5" />
        </Button>

        <Button
          variant="pagination"
          size="pagination"
          aria-label="Go to last page"
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          <ChevronsRight className="size-5" />
        </Button>

        {/* Page indicator */}
        <span className="flex items-center gap-1 px-2" aria-live="polite">
          <span className="text-[20px] font-bold">{currentPage}</span>
          <span className="text-[16px] font-normal text-muted-fg">
            / {totalPages}
          </span>
        </span>
      </div>

      {/* Right group: page jump + items per page */}
      <div className="flex items-center gap-2">
        <Input
          className="w-[100px] h-12"
          placeholder="페이지"
          value={pageJumpInput}
          onChange={(e) => setPageJumpInput(e.target.value)}
          onKeyDown={handlePageJumpKeyDown}
          aria-label="페이지 이동"
        />

        <Button variant="secondary" size="secondary" onClick={handlePageJump}>
          이동
        </Button>

        <Select
          value={String(table.getState().pagination.pageSize)}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className="w-[96px] h-12" aria-label="페이지당 항목 수">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}건
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
