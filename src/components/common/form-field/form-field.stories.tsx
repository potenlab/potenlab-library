import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./form-field";

const meta = {
  title: "Common/FormField",
  component: FormField,
  tags: ["autodocs"],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputField: Story = {
  args: {
    id: "name",
    label: "Name",
    type: "input",
    value: "John Doe",
    onChange: () => {},
  },
};

export const SelectField: Story = {
  args: {
    id: "role",
    label: "Role",
    type: "select",
    value: "Admin",
    options: ["Admin", "User", "Guest"],
    onChange: () => {},
  },
};
