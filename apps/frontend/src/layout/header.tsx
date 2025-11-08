"use client";
import { BotMessageSquare, Search } from "lucide-react";
import Image from "next/image";
import { useSearchBarStore } from "../store/search-bar";
import { useSideMenuStore } from "../store/side-menu";
import { cn } from "../utils/cn";

export function AppHeader() {
  const { setOpen, isOpen } = useSideMenuStore();
  const { isOpen: isSearchBarOpen, setOpen: setOpenSearchBar } =
    useSearchBarStore();

  return (
    <header className="sticky top-0 z-50 bg-app-foreground backdrop-blur-md border-b border-gray-700">
      <div className="flex max-w-7xl mx-auto px-4 py-3 justify-between">
        <div className="flex items-center gap-3">
          <Image
            alt="Insight Finder Logo"
            src="/logo.png"
            width={35}
            height={35}
          />
          <h1 className="text-xl font-bold text-white">Insight Finder</h1>
        </div>
        <div className="flex gap-4">
          <button
            className={cn(
              "size-9 rounded-md hover:bg-app-text/20 cursor-pointer block",
              isSearchBarOpen ? "text-blue-500" : "text-app-text"
            )}
            onClick={() => setOpenSearchBar(!isSearchBarOpen)}
          >
            <Search className="size-6 m-auto" />
          </button>
          <button
            className={cn(
              "size-9 rounded-md hover:bg-app-text/20 cursor-pointer block",
              isOpen ? "text-blue-500" : "text-app-text"
            )}
            onClick={() => setOpen(!isOpen)}
          >
            <BotMessageSquare className="size-6 m-auto" />
          </button>
        </div>
      </div>
    </header>
  );
}
