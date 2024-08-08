import type { Meta, StoryObj } from "@storybook/react";
import { useToast } from "@hooks/useToast";
import Toast from ".";

const meta = {
  title: "Components/Toast",
  component: Toast,
} as Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <>
        <Toast />
        <div className="flex items-center justify-center gap-20">
          <button
            className="h-50 w-200 bg-[#333]"
            onClick={() => {
              toast("info", "테스트 문장으로 string 타입입니다.");
            }}
          >
            info
          </button>
          <button
            className="h-50 w-200 bg-[#333]"
            onClick={() => {
              toast("success", "테스트 문장으로 string 타입입니다.");
            }}
          >
            success
          </button>
          <button
            className="h-50 w-200 bg-[#333]"
            onClick={() => {
              toast("warn", "테스트 문장으로 string 타입입니다.");
            }}
          >
            warn
          </button>
          <button
            className="h-50 w-200 bg-[#333]"
            onClick={() => {
              toast("danger", "테스트 문장으로 string 타입입니다.");
            }}
          >
            danger
          </button>
        </div>
      </>
    );
  },
};
