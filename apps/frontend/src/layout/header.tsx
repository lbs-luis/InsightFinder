"use client";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useSideMenuStore } from "../store/side-menu";

export function AppHeader() {
  const { setOpen, isOpen } = useSideMenuStore();

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
        <button
          className="text-app-text size-9 rounded-md hover:bg-app-text/20 cursor-pointer block sm:hidden"
          onClick={() => setOpen(!isOpen)}
        >
          <Menu className="size-5 m-auto" />
        </button>
      </div>
    </header>
  );
}
