"use client";

import * as React from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationControlsProps) {
  const [pageJumpInput, setPageJumpInput] = React.useState("");

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  function handleGoToFirst() {
    if (!isFirstPage) {
      onPageChange(1);
    }
  }

  function handleGoToPrevious() {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  }

  function handleGoToNext() {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  }

  function handleGoToLast() {
    if (!isLastPage) {
      onPageChange(totalPages);
    }
  }

  function handlePageJump() {
    const page = parseInt(pageJumpInput, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
      setPageJumpInput("");
    }
  }

  function handlePageJumpKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handlePageJump();
    }
  }

  function handleItemsPerPageChange(value: string) {
    const count = parseInt(value, 10);
    if (!isNaN(count)) {
      onItemsPerPageChange(count);
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
          disabled={isFirstPage}
          onClick={handleGoToFirst}
        >
          <ChevronsLeft className="size-5" />
        </Button>

        <Button
          variant="pagination"
          size="pagination"
          aria-label="Previous page"
          disabled={isFirstPage}
          onClick={handleGoToPrevious}
        >
          <ChevronLeft className="size-5" />
        </Button>

        <Button
          variant="pagination"
          size="pagination"
          aria-label="Next page"
          disabled={isLastPage}
          onClick={handleGoToNext}
        >
          <ChevronRight className="size-5" />
        </Button>

        <Button
          variant="pagination"
          size="pagination"
          aria-label="Go to last page"
          disabled={isLastPage}
          onClick={handleGoToLast}
        >
          <ChevronsRight className="size-5" />
        </Button>

        {/* Page indicator */}
        <span
          className="flex items-center gap-1 px-2"
          aria-live="polite"
        >
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

        <Button
          variant="secondary"
          size="secondary"
          onClick={handlePageJump}
        >
          이동
        </Button>

        <Select
          value={String(itemsPerPage)}
          onValueChange={handleItemsPerPageChange}
        >
          <SelectTrigger className="w-[96px] h-12" aria-label="페이지당 항목 수">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10건</SelectItem>
            <SelectItem value="20">20건</SelectItem>
            <SelectItem value="50">50건</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
