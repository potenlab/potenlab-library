"use client";

import { Switch } from "@/components/ui/switch";

export interface LabeledSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function LabeledSwitch({ id, label, checked, onCheckedChange }: LabeledSwitchProps) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor={id}
        className="font-pretendard text-[16px] font-medium text-black select-none cursor-pointer"
      >
        {label}
      </label>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
