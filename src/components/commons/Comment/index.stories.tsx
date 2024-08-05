import type { Meta, StoryObj } from "@storybook/react";
import Comment from ".";

const meta = {
  title: "Components/Comment",
  component: Comment,

  args: {
    comment: {
      user: {
        teamId: "string",
        image:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/82/9791191214376.jpg",
        nickname: "이미서있는임희서",
        updatedAt: "2024-08-02T11:47:46.644Z",
        createdAt: "2024-08-02T11:47:46.644Z",
        encryptedPassword: "string",
        email: "string",
        id: 0,
      },
      userId: 0,
      taskId: 0,
      updatedAt: "2024-08-02T11:47:46.644Z",
      createdAt: "2024-08-02T11:47:46.644Z",
      content:
        "법인 설립 서비스 관련 링크 첨부 드려요법인 설립 서비스 관련 링크 첨부 드려요법인 설립 서비스 관련 링크 첨부 드려요법인 설립 서비스관련 링크 첨부 드려요\nhttps://www.codeit.kr 하진짜 빡치긴하네요\n하하하하",
      id: 0,
    },
    onEdit: () => 1,
    onDelete: () => 1,
  },
} as Meta<typeof Comment>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Task: Story = {
  args: {
    type: "task",
  },
};

export const Article: Story = {
  args: {
    type: "article",
  },
};
