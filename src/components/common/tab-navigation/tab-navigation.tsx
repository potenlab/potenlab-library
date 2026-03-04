"use client";

import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { cn } from "../../../lib/utils";

export interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TabNavigationProps {
  tabs: TabItem[];
  defaultValue?: string;
  value?: string;
  onTabChange?: (value: string) => void;
  className?: string;
}

export function TabNavigation({
  tabs,
  defaultValue,
  value,
  onTabChange,
  className,
}: TabNavigationProps) {
  return (
    <Tabs
      defaultValue={defaultValue}
      value={value}
      onValueChange={onTabChange}
      className={cn(className)}
    >
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} disabled={tab.disabled}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
