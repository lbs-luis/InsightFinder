"use client";
import {
  Building2,
  ChefHat,
  Gamepad2,
  Globe,
  Heart,
  Plane,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/cn";
import { useSideMenuStore } from "../store/side-menu";
import { ICategory } from "../types/category.types";

export function CategoryBar() {
  const { isOpen, setOpen } = useSideMenuStore();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories: ICategory[] = [
    { id: "all", name: "Todas", icon: Globe },
    { id: "politics", name: "Política", icon: Building2 },
    { id: "culinary", name: "Culinária", icon: ChefHat },
    { id: "travel", name: "Viagens", icon: Plane },
    { id: "health", name: "Saúde", icon: Heart },
    { id: "tech", name: "Tecnologia", icon: Smartphone },
    { id: "sports", name: "Esportes", icon: Gamepad2 },
  ];

  return (
    <nav
      className={cn(
        `w-full bg-app-foreground border-b border-gray-700 md:block`,
        isOpen ? "block" : "hidden"
      )}
    >
      <div className="flex w-full max-w-7xl overflow-x-auto py-3 px-4 mx-auto space-x-1 no-scrollbar">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setOpen(false);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
