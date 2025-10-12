import { create } from "zustand";

type SideMenuStore = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

export const useSideMenuStore = create<SideMenuStore>((set) => ({
  isOpen: false,
  setOpen: (isOpen: boolean) => set({ isOpen }),
}));
