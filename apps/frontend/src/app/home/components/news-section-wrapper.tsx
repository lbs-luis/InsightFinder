"use client";

import { useSideMenuStore } from "@/src/store/side-menu";
import { useWindowWidth } from "@/src/utils/use-window-width";
import { useEffect, useState } from "react";

interface NewsSectionWrapperProps {
  children: React.ReactNode;
}
export function NewsSectionWrapper({ children }: NewsSectionWrapperProps) {
  const { isOpen } = useSideMenuStore();
  const [displayContent, setDisplayContent] = useState(true);
  const { width } = useWindowWidth();

  useEffect(() => {
    if (width <= 640) {
      if (isOpen) {
        setTimeout(() => setDisplayContent(!isOpen), 400);
      }
      if (!isOpen) {
        setDisplayContent(!isOpen);
      }
    }
  }, [isOpen, width]);

  return (
    <div className="size-full flex-1">
      {width <= 640 ? (
        displayContent ? (
          children
        ) : (
          <div className="size-full flex-1" />
        )
      ) : (
        children
      )}
    </div>
  );
}
