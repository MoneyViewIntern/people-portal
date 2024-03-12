import { create } from "zustand";

type DownloadStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useDownload = create<DownloadStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));