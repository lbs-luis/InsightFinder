"use client";

import { useNewsCategoriesStore } from "../store/news-categories";
import { useSideMenuStore } from "../store/side-menu";

import { categoriesList } from "../types/category.types";
import { cn } from "../utils/cn";

export function CategoryBar() {
  const { isOpen, setOpen } = useSideMenuStore();
  const { setCategory, category: selectedCategory } = useNewsCategoriesStore();

  return (
    <nav
      className={cn(
        `w-full bg-app-foreground border-b border-gray-700 md:block`,
        isOpen ? "block" : "hidden"
      )}
    >
      <div className="flex w-full max-w-7xl overflow-x-auto py-3 px-4 mx-auto space-x-1 no-scrollbar">
        {categoriesList.map((category, index) => {
          const Icon = category.icon;
          return (
            <button
              key={`category-${index}`}
              onClick={() => {
                setCategory(category.name);
                setOpen(false);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category.name
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
