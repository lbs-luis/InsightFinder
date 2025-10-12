"use client";

import { useSideMenuStore } from "@/src/store/side-menu";
import { cn } from "@/src/utils/cn";

export function SideMenuPlaceHolder() {
  const { isOpen } = useSideMenuStore();
  return (
    <div
      className={cn("sm:flex h-full hidden trnasition-[width] duration-500")}
      style={{ width: isOpen ? "31.5vw" : "0vw" }}
    ></div>
  );
}
