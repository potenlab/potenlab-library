import type { Meta, StoryObj } from "@storybook/react";
import { DashboardLayout } from "./dashboard-layout";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../ui/accordion";
import { cn } from "../../../lib/utils";
import {
  Home,
  UserRound,
  LayoutGrid,
  Megaphone,
  ShieldAlert,
  ScrollText,
  LogOut,
} from "lucide-react";
import type { SidebarNavItem, SidebarSubItem } from "../../../types";

const NAV_ITEMS: SidebarNavItem[] = [
  {
    label: "Home",
    icon: Home,
    href: "/",
    isAccordion: false,
  },
  {
    label: "Users",
    isAccordion: true,
    children: [{ label: "User Management", href: "/users", icon: UserRound }],
  },
  {
    label: "Matches",
    isAccordion: true,
    children: [{ label: "Match Management", href: "/matches", icon: LayoutGrid }],
  },
  {
    label: "Admin",
    isAccordion: true,
    children: [
      { label: "Notices", href: "/notices", icon: Megaphone },
      { label: "Reports", href: "/reports", icon: ShieldAlert },
      { label: "Terms", href: "/terms", icon: ScrollText },
    ],
  },
];

function StorySidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[300px] flex-col bg-white border-r border-border">
      {/* Header */}
      <div className="border-b border-[#E2E8F0] py-[20px] px-[16px]">
        <div className="flex flex-col gap-[6px]">
          <h2 className="font-pretendard text-[24px] font-semibold">ADMIN</h2>
          <p className="text-[16px] font-normal text-subtitle">admin@example.com</p>
        </div>
      </div>

      {/* Navigation */}
      <nav aria-label="Main navigation" className="flex-1 overflow-y-auto px-[16px] py-[10px]">
        <Accordion type="multiple" defaultValue={["Users"]} className="w-full">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            if (!item.isAccordion) {
              return (
                <a
                  key={item.label}
                  href={item.href ?? "/"}
                  className={cn(
                    "flex h-[44px] items-center gap-[10px] rounded-md px-[14px] py-[8px] font-pretendard text-[16px] text-[#5A5E6A] transition-colors duration-150 hover:bg-[#EEF2F6]"
                  )}
                >
                  {Icon && <Icon className="size-5 shrink-0" />}
                  <span>{item.label}</span>
                </a>
              );
            }

            return (
              <AccordionItem key={item.label} value={item.label} className="border-b-0">
                <AccordionTrigger className="h-[44px] items-center gap-[10px] rounded-md px-[14px] py-0 hover:bg-[#EEF2F6] hover:no-underline">
                  <span className="font-pretendard text-[16px] text-[#5A5E6A]">
                    {item.label}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pt-0">
                  <div className="flex flex-col px-2">
                    {item.children?.map((child: SidebarSubItem) => {
                      const ChildIcon = child.icon;
                      return (
                        <a
                          key={child.label}
                          href={child.href}
                          className="flex h-[44px] items-center gap-[10px] rounded-[4px] px-[14px] py-[8px] font-pretendard text-[16px] text-[#5A5E6A] transition-colors duration-150 hover:bg-[#EEF2F6]"
                        >
                          {ChildIcon && <ChildIcon className="size-4 shrink-0" />}
                          <span>{child.label}</span>
                        </a>
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
          className="flex w-full items-center justify-center gap-3 font-pretendard text-[16px] text-[#5A5E6A] transition-colors duration-150 hover:text-red-500"
        >
          <LogOut className="size-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

const meta = {
  title: "Layouts/DashboardLayout",
  component: DashboardLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DashboardLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DashboardLayout sidebar={<StorySidebar />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome to the admin dashboard.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {["Total Users", "Active Matches", "Reports"].map((title) => (
            <div
              key={title}
              className="rounded-lg border border-border bg-white p-6"
            >
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="mt-2 text-3xl font-bold">
                {Math.floor(Math.random() * 1000)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  ),
};
