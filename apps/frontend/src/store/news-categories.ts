import { create } from "zustand";
import { NewCategoriesEnum } from "../types/category.types";

type NewsCategoriesStore = {
  category: NewCategoriesEnum;
  setCategory: (category: NewCategoriesEnum) => void;
};

export const useNewsCategoriesStore = create<NewsCategoriesStore>((set) => ({
  category: NewCategoriesEnum.TODOS,
  setCategory: (category: NewCategoriesEnum) => set({ category }),
}));
