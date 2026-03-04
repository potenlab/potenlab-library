"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UserRound, LayoutGrid, Megaphone, ShieldAlert, ScrollText, LogOut } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  cn,
  type SidebarNavItem,
  type SidebarSubItem,
} from "@potenlab/ui";

const NAV_ITEMS: SidebarNavItem[] = [
  {
    label: "홈",
    icon: Home,
    href: "/",
    isAccordion: false,
  },
  {
    label: "사용자",
    isAccordion: true,
    children: [{ label: "사용자관리", href: "/", icon: UserRound }],
  },
  {
    label: "매치",
    isAccordion: true,
    children: [{ label: "매치 관리", href: "/matches", icon: LayoutGrid }],
  },
  {
    label: "관리자",
    isAccordion: true,
    children: [
      { label: "공지사항 관리", href: "/notices", icon: Megaphone },
      { label: "신고 관리", href: "/reports", icon: ShieldAlert },
      { label: "약관 관리", href: "/terms", icon: ScrollText },
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
      {/* Header */}
      <div className="border-b border-[#E2E8F0] py-[20px] px-[16px]">
        <div className="flex flex-col gap-[6px]">
          <h2 className="font-pretendard text-[24px] font-semibold">
            ADMIN
          </h2>
          <p className="text-[16px] font-normal text-subtitle">
            관리자아이디
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav aria-label="Main navigation" className="flex-1 overflow-y-auto px-[16px] py-[10px]">
        <Accordion
          type="multiple"
          defaultValue={defaultOpenSections}
          className="w-full"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            if (!item.isAccordion) {
              return (
                <Link
                  key={item.label}
                  href={item.href ?? "/"}
                  className={cn(
                    "flex h-[44px] items-center gap-[10px] rounded-md px-[14px] py-[8px] font-pretendard text-[16px] text-[#5A5E6A] transition-colors duration-150 hover:bg-table-header focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    pathname === item.href &&
                      !NAV_ITEMS.some(
                        (nav) =>
                          nav.isAccordion &&
                          nav.children?.some((c) => c.href === pathname)
                      ) &&
                      "bg-[#EEF2F6] text-black"
                  )}
                >
                  {Icon && <Icon className="size-5 shrink-0" />}
                  <span>{item.label}</span>
                </Link>
              );
            }

            return (
              <AccordionItem
                key={item.label}
                value={item.label}
                className="border-b-0"
              >
                <AccordionTrigger className="h-[44px] items-center gap-[10px] rounded-md px-[14px] py-0 hover:bg-table-header hover:no-underline">
                  <span className="font-pretendard text-[16px] text-[#5A5E6A]">{item.label}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pt-0">
                  <div className="flex flex-col px-2">
                    {item.children?.map((child: SidebarSubItem) => {
                      const isActive = pathname === child.href;
                      const ChildIcon = child.icon;
                      return (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={cn(
                            "flex h-[44px] items-center gap-[10px] rounded-[4px] px-[14px] py-[8px] font-pretendard text-[16px] text-[#5A5E6A] transition-colors duration-150 hover:bg-[#EEF2F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                            isActive && "bg-[#EEF2F6] text-black"
                          )}
                        >
                          {ChildIcon && <ChildIcon className="size-4 shrink-0" />}
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
      </nav>

      {/* Footer */}
      <div className="border-t border-[#E2E8F0] py-[20px]">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 font-pretendard text-[16px] text-[#5A5E6A] transition-colors duration-150 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          onClick={() => {
            // UI only - no actual logout logic
          }}
        >
          <LogOut className="size-5" />
          <span>로그아웃</span>
        </button>
      </div>
    </aside>
  );
}
