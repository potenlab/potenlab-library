"use client";

import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export interface FormFieldProps {
  id: string;
  label: string;
  type: "input" | "select";
  value: string;
  options?: string[];
  onChange: (value: string) => void;
}

export function FormField({ id, label, type, value, options, onChange }: FormFieldProps) {
  if (type === "select") {
    return (
      <div className="flex flex-col">
        <Label htmlFor={id}>{label}</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id={id} className="h-[52px] pr-4">
            <SelectValue placeholder={label} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        className="h-[52px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
