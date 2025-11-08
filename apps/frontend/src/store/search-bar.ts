import { create } from "zustand";

type SearchBarStore = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

export const useSearchBarStore = create<SearchBarStore>((set) => ({
  isOpen: false,
  setOpen: (isOpen: boolean) => set({ isOpen }),
}));
