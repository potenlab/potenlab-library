import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
];

const data: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: "3", name: "Bob Wilson", email: "bob@example.com", role: "Editor" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "User" },
  { id: "5", name: "Charlie Davis", email: "charlie@example.com", role: "Admin" },
];

const meta = {
  title: "Common/DataTable",
  component: DataTable,
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns,
    data,
  },
};

export const WithPagination: Story = {
  args: {
    columns,
    data,
    enablePagination: true,
  },
};

export const WithSorting: Story = {
  args: {
    columns,
    data,
    enableSorting: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: "No users found.",
  },
};
