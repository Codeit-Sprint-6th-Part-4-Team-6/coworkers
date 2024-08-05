import { ComponentType } from "react";
import create from "zustand";

interface ModalProps {
  onClose?: () => void;
  onConfirm?: () => void;
}

interface ModalState {
  modalType: string | null;
  ModalComponent: ComponentType<ModalProps> | null;
  modalProps: ModalProps | null;
  openModal: (type: string, Component: ComponentType<ModalProps>, props?: ModalProps) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  ModalComponent: null,
  modalProps: null,
  openModal: (type, Component, props) =>
    set({ modalType: type, ModalComponent: Component, modalProps: props || null }),
  closeModal: () => set({ modalType: null, ModalComponent: null, modalProps: null }),
}));
