"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface TabNavigationProps {
  defaultValue?: string
  onTabChange?: (value: string) => void
}

export function TabNavigation({
  defaultValue = "all",
  onTabChange,
}: TabNavigationProps) {
  return (
    <Tabs
      defaultValue={defaultValue}
      onValueChange={onTabChange}
    >
      <TabsList>
        <TabsTrigger value="all">전체</TabsTrigger>
        <TabsTrigger value="tab2">Tab</TabsTrigger>
        <TabsTrigger value="tab3">Tab</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
