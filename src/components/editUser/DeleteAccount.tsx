import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@hooks/auth/useAuth";
import { useModal } from "@hooks/useModal";
import { useToast } from "@hooks/useToast";
import { IconDeleteAccount } from "@utils/icon";
import { deleteUser } from "@api/userApi";
import DeleteAccountModal from "./DeleteAccountModal";

export default function DeleteAccount() {
  const { openModal, closeModal } = useModal();
  const { logout } = useAuth();
  const { toast } = useToast();

  const deleteAccountMutation = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      toast("success", "회원 탈퇴가 완료되었습니다.");
      logout();
    },
  });

  const deleteOnConfirm = () => {
    closeModal();
    deleteAccountMutation.mutate();
  };

  const handleOpenModal = () => {
    openModal("DeleteAccountModal", DeleteAccountModal, { onConfirm: deleteOnConfirm });
  };

  return (
    <button
      type="button"
      onClick={handleOpenModal}
      className="flex items-center text-status-danger"
    >
      <IconDeleteAccount className="mr-8 inline" />
      회원 탈퇴하기
    </button>
  );
}
