"use client";

import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <Input
      className="h-12 rounded-md"
      placeholder={placeholder || "검색어를 입력하세요."}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search users"
    />
  );
}
