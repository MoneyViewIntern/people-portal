import { create } from "zustand";

type TagSearchStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useTagSearch = create<TagSearchStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));