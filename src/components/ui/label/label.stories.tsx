import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { Input } from "../input";

const meta = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="Enter your email" />
    </div>
  ),
};
