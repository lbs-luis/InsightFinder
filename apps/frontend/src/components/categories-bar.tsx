"use client";

import { useNewsCategoriesStore } from "../store/news-categories";

import { categoriesList } from "../types/category.types";
import { cn } from "../utils/cn";

type CategoryBarProps = { className?: string };
export function CategoryBar({ className }: CategoryBarProps) {
  const { setCategory, category: selectedCategory } = useNewsCategoriesStore();

  return (
    <div className="flex w-full h-fit px-4">
      <nav
        className={cn(
          className,
          `flex w-full max-w-7xl bg-app-foreground border border-gray-700 h-fit rounded-xl  overflow-x-scroll mx-auto no-scrollbar`
        )}
      >
        <div className="flex py-3 px-4 space-x-1 no-scrollbar shrink-0">
          {categoriesList.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={`category-${index}`}
                onClick={() => {
                  setCategory(category.name);
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
    </div>
  );
}
