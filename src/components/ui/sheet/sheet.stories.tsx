import type { Meta, StoryObj } from "@storybook/react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./sheet";
import { Button } from "../button";

const meta = {
  title: "UI/Sheet",
  component: Sheet,
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Sheet description goes here.</SheetDescription>
        </SheetHeader>
        <div className="p-4">Sheet content area.</div>
      </SheetContent>
    </Sheet>
  ),
};
