import type { Meta, StoryObj } from "@storybook/react";
import Textarea from ".";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
} as Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Transparent: Story = {
  args: {
    type: "transparent",
  },
};

export const InnerButton: Story = {
  args: {
    type: "innerButton",
  },
};

export const Small: Story = {
  args: {
    type: "small",
  },
};

export const Big: Story = {
  args: {
    type: "big",
  },
};
