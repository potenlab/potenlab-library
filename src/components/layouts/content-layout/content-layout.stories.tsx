import type { Meta, StoryObj } from "@storybook/react";
import { ContentLayout } from "./content-layout";

const meta = {
  title: "Layouts/ContentLayout",
  component: ContentLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ContentLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContentLayout>
      <div className="p-4 border border-dashed border-border rounded">
        Content goes here
      </div>
    </ContentLayout>
  ),
};
