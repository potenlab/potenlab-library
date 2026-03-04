import type { LucideIcon } from "lucide-react";

export interface SidebarNavItem {
  label: string;
  icon?: LucideIcon;
  href?: string;
  isAccordion: boolean;
  children?: SidebarSubItem[];
}

export interface SidebarSubItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}
