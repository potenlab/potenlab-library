import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "outline", "pagination"],
    },
    size: {
      control: "select",
      options: ["default", "secondary", "pagination", "ghost", "icon"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { children: "Button" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Secondary" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Ghost" } };
export const Outline: Story = { args: { variant: "outline", children: "Outline" } };
export const Disabled: Story = { args: { children: "Disabled", disabled: true } };
