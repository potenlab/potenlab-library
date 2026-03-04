import type { Meta, StoryObj } from "@storybook/react";
import { PaginationControls } from "./pagination-controls";

const meta = {
  title: "Common/PaginationControls",
  component: PaginationControls,
  tags: ["autodocs"],
} satisfies Meta<typeof PaginationControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    itemsPerPage: 10,
    onPageChange: () => {},
    onItemsPerPageChange: () => {},
  },
};
