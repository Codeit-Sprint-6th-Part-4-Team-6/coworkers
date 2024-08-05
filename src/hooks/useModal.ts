import { ComponentType } from "react";
import { useModalStore } from "../store/useModalStore";

interface ModalProps {
  onClose?: () => void;
  onConfirm?: () => void;
}

interface UseModal {
  openModal: (type: string, Component: ComponentType<ModalProps>, props?: ModalProps) => void;
  closeModal: () => void;
  modalType: string | null;
  ModalComponent: ComponentType<ModalProps> | null;
  modalProps: ModalProps | null;
}

export const useModal = (): UseModal => {
  const { openModal, closeModal, modalType, ModalComponent, modalProps } = useModalStore();

  return {
    openModal,
    closeModal,
    modalType,
    ModalComponent,
    modalProps,
  };
};
