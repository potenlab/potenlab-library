"use client";

import * as React from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { cn } from "../../../lib/utils";

export interface PaginationLabels {
  pageJumpPlaceholder?: string;
  pageJumpButton?: string;
  itemsPerPageLabel?: string;
  itemSuffix?: string;
}

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
  labels?: PaginationLabels;
  className?: string;
}

export function PaginationControls({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  labels,
  className,
}: PaginationControlsProps) {
  const [pageJumpInput, setPageJumpInput] = React.useState("");

  const pageJumpPlaceholder = labels?.pageJumpPlaceholder ?? "Page";
  const pageJumpButton = labels?.pageJumpButton ?? "Go";
  const itemsPerPageLabel = labels?.itemsPerPageLabel ?? "Items per page";
  const itemSuffix = labels?.itemSuffix ?? "";

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
    <div className={cn("flex items-center justify-between", className)}>
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
          placeholder={pageJumpPlaceholder}
          value={pageJumpInput}
          onChange={(e) => setPageJumpInput(e.target.value)}
          onKeyDown={handlePageJumpKeyDown}
          aria-label={pageJumpPlaceholder}
        />

        <Button
          variant="secondary"
          size="secondary"
          onClick={handlePageJump}
        >
          {pageJumpButton}
        </Button>

        <Select
          value={String(itemsPerPage)}
          onValueChange={handleItemsPerPageChange}
        >
          <SelectTrigger className="w-[96px] h-12" aria-label={itemsPerPageLabel}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10{itemSuffix}</SelectItem>
            <SelectItem value="20">20{itemSuffix}</SelectItem>
            <SelectItem value="50">50{itemSuffix}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
