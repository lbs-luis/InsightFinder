import { useEffect, useState } from "react";

export function useWindowWidth(): { width: number } {
  const [width, setWidth] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 0;
  });

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width };
}
