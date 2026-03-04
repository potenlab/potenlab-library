import type { Meta, StoryObj } from "@storybook/react";
import { LabeledSwitch } from "./labeled-switch";

const meta = {
  title: "Common/LabeledSwitch",
  component: LabeledSwitch,
  tags: ["autodocs"],
} satisfies Meta<typeof LabeledSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "notifications",
    label: "Enable notifications",
    checked: false,
    onCheckedChange: () => {},
  },
};

export const Checked: Story = {
  args: {
    id: "notifications",
    label: "Enable notifications",
    checked: true,
    onCheckedChange: () => {},
  },
};
