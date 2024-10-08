import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import EditDeletePopover from "@components/commons/Popover/EditDeletePopover";
import DeleteTeamModal from "@components/teams/DeleteTeamModal";
import { useModal } from "@hooks/useModal";
import { useToast } from "@hooks/useToast";
import { deleteGroup } from "@api/groupApi";

export default function TeamTitle({
  teamName,
  teamId,
  role,
  profile,
}: {
  teamName: string;
  teamId: number;
  role: string;
  profile: string;
}) {
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleModify = () => {
    router.push(`/teams/${teamId}/edit`);
  };

  const deleteGroupMutation = useMutation({
    mutationFn: (groupId: number) => deleteGroup(groupId),
    onSuccess: () => {
      toast("success", "해당 팀이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      router.push("/teams");
    },
  });

  const deleteOnConfirm = () => {
    deleteGroupMutation.mutate(teamId);
    closeModal();
  };

  const handleOpenModal = () => {
    openModal("DeleteTeamModal", DeleteTeamModal, { onConfirm: deleteOnConfirm });
  };

  return (
    <div className="relative box-border flex h-[64px] max-h-[64px] items-center justify-between rounded-12 border border-solid border-border-primary bg-background-secondary px-24 py-20">
      <Image
        src="/images/team_title_img.png"
        alt=""
        width={181}
        height={64}
        className="absolute right-74 xs:right-10"
        priority
      />
      <div className="flex items-center gap-12 md:gap-16">
        {profile && (
          <div className="relative h-32 w-32 flex-shrink-0">
            <Image
              src={profile}
              alt="groupProfile"
              fill
              priority
              className="rounded-6 object-cover"
            />
          </div>
        )}
        <h1 className="text-xl font-bold">{teamName}</h1>
      </div>
      {role === "ADMIN" ? (
        <EditDeletePopover icon="gear" handleDelete={handleOpenModal} handleModify={handleModify} />
      ) : null}
    </div>
  );
}
