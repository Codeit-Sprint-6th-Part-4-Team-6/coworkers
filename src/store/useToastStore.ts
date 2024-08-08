import { Toast } from "@coworkers-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ToastState {
  toast: Toast | null;
  isOpen: boolean;
}
interface ToastAction {
  setToast: (toast: Toast) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useToastStore = create<ToastState & ToastAction>()(
  devtools((set) => ({
    toast: null,
    isOpen: false,
    setToast: (toast: Toast | null) => {
      set({ toast });
    },
    setIsOpen: (isOpen: boolean) => {
      set({ isOpen });
    },
  }))
);
