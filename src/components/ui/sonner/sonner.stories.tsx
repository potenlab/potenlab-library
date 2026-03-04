import type { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "./sonner";
import { Button } from "../button";
import { toast } from "sonner";

const meta = {
  title: "UI/Sonner",
  component: Toaster,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button onClick={() => toast.success("Success!")}>Success</Button>
      <Button onClick={() => toast.error("Error!")}>Error</Button>
      <Button onClick={() => toast.info("Info")}>Info</Button>
      <Button onClick={() => toast.warning("Warning")}>Warning</Button>
    </div>
  ),
};
