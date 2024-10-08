import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useModalStore } from "@store/useModalStore";
import LoginPage from "../../../pages/login";
import ConfirmModal from "./ConfirmModal";
import CustomModal from "./CustomModal";
import ModalWrapper from "./ModalWrapper";
import OneInputModal from "./OneInputModal";
import TwoInputModal from "./TwoInputModal";
import WarnModal from "./WarnModal";

function InviteModal({ onClose }: { onClose?: () => void }) {
  return (
    <ConfirmModal
      title="멤버 초대"
      content="그룹에 참여할 수 있는 링크를 복사합니다."
      buttonText="링크 복사하기"
      onConfirm={() => alert("confirm 버튼")}
      onClose={onClose}
    />
  );
}

function TaskListModal({ onClose }: { onClose?: () => void }) {
  return (
    <OneInputModal
      title="할 일 목록"
      content="옵셔널로 받는 컨텐트"
      placeholder="목록 명을 입력해주세요."
      buttonText="추가하기"
      onConfirm={() => alert("인풋하나 모달")}
      onClose={onClose}
      closeButton
    />
  );
}

function AddTaskModal({ onClose }: { onClose?: () => void }) {
  return (
    <TwoInputModal
      title="할 일 만들기"
      content="할 일은 실제로 행동 가능한 어쩌고 하면 좋습니다 ㅎ"
      firstTitle="할 일 제목"
      firstPlaceholder="할 일 제목을 입력해주세요."
      secondTitle="할 일 메모"
      secondPlaceholder="메모를 입력해주세요."
      buttonText="만들기"
      onConfirm={() => alert("인풋두개 모달")}
      onClose={onClose}
      closeButton
    />
  );
}

function WithdrawalModal({ onClose }: { onClose?: () => void }) {
  return (
    <WarnModal
      title="로그아웃 하시겠어요?"
      onConfirm={() => alert("회원탈퇴")}
      buttonText="로그아웃"
      onClose={onClose}
    />
  );
}

function CustomModalTest({ onClose }: { onClose?: () => void }) {
  return <CustomModal content={<LoginPage />} />;
}

export default {
  title: "Components/ModalWrapper",
  component: ModalWrapper,
} as Meta<typeof ModalWrapper>;

type Story = StoryObj<typeof ModalWrapper>;

export const Default: Story = {
  render: () => {
    const { openModal } = useModalStore();

    const openInviteModal = () => {
      openModal("InviteModal", InviteModal, {});
    };

    const openTaskListModal = () => {
      openModal("TaskListModal", TaskListModal, {});
    };

    const openAddTaskModal = () => {
      openModal("AddTaskModal", AddTaskModal, {});
    };

    const openWithdrawalModal = () => {
      openModal("WithdrawalModal", WithdrawalModal, {});
    };

    const openCustomModal = () => {
      openModal("CustomModal", CustomModalTest, {});
    };

    return (
      <>
        <ModalWrapper />
        <div className="flex items-center justify-center gap-20">
          <button className="h-50 w-200 bg-[#fff]" onClick={openInviteModal}>
            멤버 초대
          </button>
          <button className="h-50 w-200 bg-[#fff]" onClick={openTaskListModal}>
            할 일 목록
          </button>
          <button className="h-50 w-200 bg-[#fff]" onClick={openAddTaskModal}>
            할 일 만들기
          </button>
          <button className="h-50 w-200 bg-[#fff]" onClick={openWithdrawalModal}>
            회원 탈퇴
          </button>
          <button className="h-50 w-200 bg-[#fff]" onClick={openCustomModal}>
            커스텀 모달
          </button>
        </div>
      </>
    );
  },
};
