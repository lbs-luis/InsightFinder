import { Building2, Globe, HandCoins, Microscope } from "lucide-react";

export enum NewCategoriesEnum {
  POLITICA = "Política",
  CIENCIA_E_SAUDE = "Ciência e Saúde",
  ECONOMIA = "Economia",
  TODOS = "Todos",
}

interface ICategory {
  name: NewCategoriesEnum;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const categoriesList: ICategory[] = [
  { name: NewCategoriesEnum.TODOS, icon: Globe },
  { name: NewCategoriesEnum.POLITICA, icon: Building2 },
  { name: NewCategoriesEnum.ECONOMIA, icon: HandCoins },
  { name: NewCategoriesEnum.CIENCIA_E_SAUDE, icon: Microscope },
];
