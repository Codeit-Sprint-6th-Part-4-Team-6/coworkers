import { useState } from "react";
import { ArticleComment, CommentType } from "@coworkers-types";
import classNames from "classnames";
import { useModal } from "@hooks/useModal";
import { useAuthStore } from "@store/useAuthStore";
import { calculateElapsedTime } from "@utils/calculateElapsedTime";
import { checkIsLink } from "@utils/checkIsLink";
import { IconKebabSmall } from "@utils/icon";
import Button from "../Button";
import TextButton from "../Button/TextButton";
import NameTag from "../NameTag";
import Textarea from "../TextArea";
import {
  CancelCommentEditModal,
  ConfirmCommentEditModal,
  DeleteCommentModal,
} from "./CommentModal";

type CommentProps = {
  type: "task" | "article";
  comment: CommentType | ArticleComment;
  onEdit: () => void;
};

// CommentType 타입 가드 함수
function isCommentType(comment: CommentType | ArticleComment): comment is CommentType {
  return (comment as CommentType).user !== undefined;
}

export default function Comment({ type, comment, onEdit }: CommentProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(comment.content);
  const { openModal } = useModal();
  // const { user } = useAuthStore();
  const user = {
    id: 0,
  };

  const showKebab = isCommentType(comment)
    ? comment.userId === user?.id
    : comment.writer.id === user?.id;

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  const handleDelete = () => {
    openModal("DeleteCommentModal", DeleteCommentModal, { onConfirm: handleDeleteConfirm });
  };
  const handleCancel = () => {
    openModal("CancelCommentEditModal", CancelCommentEditModal, { onConfirm: handleCancelConfirm });
  };
  const handleEdit = () => {
    if (!value) {
      handleDelete();
    } else {
      openModal("ConfirmCommentEditModal", ConfirmCommentEditModal, {
        onConfirm: handleEditConfirm,
      });
    }
  };

  const handleDeleteConfirm = () => {};
  const handleCancelConfirm = () => {};
  const handleEditConfirm = () => {};

  const classnames = classNames(
    "w-full flex flex-col",
    type === "task"
      ? "border-b border-solid border-border-primary pb-16 gap-16"
      : "bg-background-secondary rounded-[8px] p-16 md:px-24 md:py-20 gap-24 lg:gap-32"
  );

  return (
    <>
      <div className={classnames}>
        {isEditMode ? (
          <>
            <Textarea
              type="transparent"
              placeholder="댓글을 입력해주세요."
              defaultValue={comment.content}
              onBlur={handleBlur}
            />
            <div className="flex justify-end gap-8">
              <TextButton
                buttonType="button"
                className="w-48 justify-center text-14 font-semibold text-text-default md:text-14"
                onClick={handleCancel}
              >
                취소
              </TextButton>
              <Button
                buttonType="button"
                size="small"
                buttonStyle="transparent"
                onClick={handleEdit}
              >
                수정하기
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <div className="text-md font-normal text-text-primary">
                {comment.content.split("\n").map((line) => (
                  <p dangerouslySetInnerHTML={{ __html: checkIsLink(line) }} />
                ))}
              </div>
              {/* 케밥 드롭다운 부분 */}
              {showKebab && <IconKebabSmall className="shrink-0 cursor-auto" />}
            </div>
            <div className="flex items-center justify-between">
              <NameTag
                type={type === "task" ? "default-12" : "default-6"}
                image={isCommentType(comment) ? comment.user.image : comment.writer.image}
                name={isCommentType(comment) ? comment.user.nickname : comment.writer.nickname}
              />
              <span className="text-md font-normal text-text-secondary">
                {calculateElapsedTime(comment.createdAt)}
              </span>
            </div>
          </>
        )}
      </div>
      <button type="button" onClick={() => setIsEditMode(true)}>
        테스트용 버튼
      </button>
    </>
  );
}
