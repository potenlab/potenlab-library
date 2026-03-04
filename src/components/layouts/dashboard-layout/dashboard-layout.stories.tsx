import type { Meta, StoryObj } from "@storybook/react";
import { DashboardLayout } from "./dashboard-layout";

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
    <DashboardLayout
      sidebar={
        <aside className="fixed left-0 top-0 h-screen w-[300px] bg-white border-r border-border p-4">
          <h2 className="text-xl font-bold">Sidebar</h2>
          <nav className="mt-4 space-y-2">
            <a href="#" className="block p-2 rounded hover:bg-gray-100">Home</a>
            <a href="#" className="block p-2 rounded hover:bg-gray-100">Users</a>
            <a href="#" className="block p-2 rounded hover:bg-gray-100">Settings</a>
          </nav>
        </aside>
      }
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard Content</h1>
        <p className="mt-2">Main content area.</p>
      </div>
    </DashboardLayout>
  ),
};
