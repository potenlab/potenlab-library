import type { Meta, StoryObj } from "@storybook/react";
import { Pencil } from "lucide-react";
import { PageHeader } from "./page-header";

const meta = {
  title: "Common/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "User Management",
    subtitle: "Manage user accounts",
    badgeCount: 1234,
    actionLabel: "Create",
    actionIcon: Pencil,
  },
};

export const WithoutBadge: Story = {
  args: {
    title: "Settings",
    subtitle: "Application settings",
    actionLabel: "Save",
  },
};
