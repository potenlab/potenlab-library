"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "검색어를 입력하세요.",
  ariaLabel = "검색",
  className,
}: SearchBarProps) {
  return (
    <Input
      className={cn("h-12 rounded-md", className)}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
    />
  );
}
