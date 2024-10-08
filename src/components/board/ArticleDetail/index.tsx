import { useState } from "react";
import { ArticleDetails } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import NameTag from "@components/commons/NameTag";
import EditDeletePopover from "@components/commons/Popover/EditDeletePopover";
import { useModal } from "@hooks/useModal";
import { useToast } from "@hooks/useToast";
import { useAuthStore } from "@store/useAuthStore";
import { IconComment, IconHeart, IconHeartFill } from "@utils/icon";
import { deleteArticle, deleteArticleLike, postArticleLike } from "@api/articleApi";
import DeleteArticleModal from "./DeleteArticleModal";

export default function ArticleDetail({ article }: { article?: ArticleDetails }) {
  const [isLiked, setIsLiked] = useState(article?.isLiked);
  const [likeCount, setLikeCount] = useState(article?.likeCount || 0);
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  if (!article) {
    router.replace("/404");
    return <div>No data</div>;
  }

  const { title, writer, createdAt, image, content, id, commentCount } = article;

  const handleDeleteConfirm = () => {
    deleteArticle(id).then(() => {
      toast("success", "게시글 삭제에 성공했습니다.");
      closeModal();
      router.push("/board");
    });
  };

  const handleOpenWarnModal = () => {
    openModal("DeleteModal", DeleteArticleModal, { onConfirm: handleDeleteConfirm });
  };

  const likeMutation = useMutation({
    mutationFn: () => postArticleLike(id),
    onMutate: () => {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["article"] }),
  });

  const unlikeMutation = useMutation({
    mutationFn: () => deleteArticleLike(id),
    onMutate: () => {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["article"] }),
  });

  const handleLikeClick = () => {
    if (likeMutation.isPending || unlikeMutation.isPending) {
      return;
    }

    if (isLiked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  return (
    <div className="flex flex-col gap-20">
      <div className="flex justify-between">
        <h1 className="text-18 font-[500] text-text-primary">{title}</h1>
        {user?.id === writer.id && (
          <EditDeletePopover
            icon="kebabLarge"
            handleModify={() => router.push(`/board/${id}/edit`)}
            handleDelete={handleOpenWarnModal}
          />
        )}
      </div>
      <div className="flex justify-between border-t border-solid border-background-tertiary">
        <div className="mt-12 flex items-center justify-center gap-12">
          <NameTag type="default-12" image={writer.image} name={writer.nickname} />
          <span className="text-nowrap border-l border-solid border-background-tertiary pl-12 text-14 font-[500] text-text-disabled">
            {format(createdAt, "yyyy. MM. dd")}
          </span>
        </div>
        <div className="mt-12 flex gap-12">
          <div className="flex items-center justify-center gap-5">
            <IconComment />
            <span className="text-14 font-[400] text-text-disabled">{commentCount}</span>
          </div>
          <div className="flex items-center justify-center gap-5">
            {isLiked ? (
              <IconHeartFill
                onClick={handleLikeClick}
                className={`${likeMutation.isPending || unlikeMutation.isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
              />
            ) : (
              <IconHeart
                onClick={handleLikeClick}
                className={`${likeMutation.isPending || unlikeMutation.isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
              />
            )}
            <span className="text-14 font-[400] text-text-disabled">{likeCount}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-24">
        {image && <Image width={600} height={600} src={image} alt="Article image" />}
        <p className="mt-4 text-lg font-normal text-text-primary">{content}</p>
      </div>
    </div>
  );
}
