import { create } from "zustand";

type ProfileEditStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useProfileEdit = create<ProfileEditStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));