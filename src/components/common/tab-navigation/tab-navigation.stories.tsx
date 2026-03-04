import type { Meta, StoryObj } from "@storybook/react";
import { TabNavigation } from "./tab-navigation";

const meta = {
  title: "Common/TabNavigation",
  component: TabNavigation,
  tags: ["autodocs"],
} satisfies Meta<typeof TabNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      { value: "all", label: "All" },
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
    defaultValue: "all",
  },
};
