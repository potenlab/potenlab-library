"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Gamepad2, Shield, LogOut } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { SidebarNavItem, SidebarSubItem } from "@/types/index";

const NAV_ITEMS: SidebarNavItem[] = [
  {
    label: "홈",
    icon: Home,
    href: "/",
    isAccordion: false,
  },
  {
    label: "사용자",
    icon: Users,
    isAccordion: true,
    children: [{ label: "사용자관리", href: "/" }],
  },
  {
    label: "매치",
    icon: Gamepad2,
    isAccordion: true,
    children: [{ label: "매치 관리", href: "/matches" }],
  },
  {
    label: "관리자",
    icon: Shield,
    isAccordion: true,
    children: [
      { label: "공지사항 관리", href: "/notices" },
      { label: "신고 관리", href: "/reports" },
      { label: "약관 관리", href: "/terms" },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  // Determine which accordion sections should be open based on current path
  const defaultOpenSections = NAV_ITEMS.filter(
    (item) =>
      item.isAccordion &&
      item.children?.some((child) => child.href === pathname)
  ).map((item) => item.label);

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[300px] flex-col bg-white border-r border-border">
      {/* Sidebar wrapper with padding */}
      <nav aria-label="Main navigation" className="flex flex-1 flex-col p-6 overflow-hidden">
        {/* Header */}
        <div className="pb-8">
          <h2 className="font-pretendard text-[24px] font-semibold tracking-[0.05em]">
            ADMIN
          </h2>
          <p className="text-[14px] font-normal text-subtitle">
            관리자아이디
          </p>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <Accordion
            type="multiple"
            defaultValue={defaultOpenSections}
            className="w-full"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;

              // Home item: simple link, not an accordion
              if (!item.isAccordion) {
                return (
                  <Link
                    key={item.label}
                    href={item.href ?? "/"}
                    className={cn(
                      "flex h-[48px] items-center gap-3 rounded-md px-3 font-inter text-[16px] text-muted-fg transition-colors duration-150 hover:bg-table-header focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      pathname === item.href &&
                        !NAV_ITEMS.some(
                          (nav) =>
                            nav.isAccordion &&
                            nav.children?.some((c) => c.href === pathname)
                        ) &&
                        "bg-sidebar-selected text-primary"
                    )}
                  >
                    <Icon className="size-5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              }

              // Accordion items
              return (
                <AccordionItem
                  key={item.label}
                  value={item.label}
                  className="border-b-0"
                >
                  <AccordionTrigger
                    className={cn(
                      "h-[48px] items-center gap-3 rounded-md px-3 py-0 hover:bg-table-header hover:no-underline"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 shrink-0 text-muted-fg" />
                      <span>{item.label}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0 pt-0">
                    <div className="flex flex-col">
                      {item.children?.map((child: SidebarSubItem) => {
                        const isActive = pathname === child.href;
                        return (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={cn(
                              "flex h-[44px] items-center gap-2 rounded-md pl-10 pr-3 font-inter text-[16px] text-muted-fg transition-colors duration-150 hover:bg-table-header focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                              isActive &&
                                "bg-sidebar-selected text-primary font-medium"
                            )}
                          >
                            {isActive && (
                              <span className="mr-1 inline-block size-1.5 rounded-full bg-primary" />
                            )}
                            <span>{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4">
          <Separator className="mb-4" />
          <button
            type="button"
            className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md font-inter text-[16px] text-muted-fg transition-colors duration-150 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={() => {
              // UI only - no actual logout logic
            }}
          >
            <LogOut className="size-5" />
            <span>로그아웃</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
