"use client";

import { Input } from "../../ui/input";
import { cn } from "../../../lib/utils";

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
  placeholder = "Search...",
  ariaLabel = "Search",
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
