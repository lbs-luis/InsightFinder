"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { cn } from "../utils/cn";
import { parseKeywords, removeKeyword } from "../utils/keyword-utils";
import { useQueryParams } from "../utils/use-query-params";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function SearchTags() {
  const { set, get } = useQueryParams();
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null);

  const keywordsArray = parseKeywords(get("keywords"));

  const deleteKeyWord = (keyword: string) => {
    const rawKeyWords = get("keywords");
    if (!rawKeyWords) return;
    const newKeyWordArray = removeKeyword(rawKeyWords, keyword);
    set("keywords", newKeyWordArray);
    setActiveKeyword(null);
  };

  const handleBadgeClick = (keyword: string) => {
    setActiveKeyword(activeKeyword === keyword ? null : keyword);
  };

  return (
    <div
      className={cn(
        "w-full px-4 transition-spacing duration-300",
        keywordsArray.length > 0 ? "h-[2.375rem] mt-4" : "h-0 mt-0"
      )}
    >
      <div className="max-w-7xl w-full flex gap-4 overflow-x-auto h-full mx-auto">
        {keywordsArray.map((keyword, i) => {
          const isActive = activeKeyword === keyword;

          return (
            <Badge
              key={`keyword-badge-${i}`}
              onClick={() => handleBadgeClick(keyword)}
              className={cn(
                "group/item cursor-pointer select-none",
                "bg-app-foreground border border-gray-700 text-white font-medium text-sm rounded-xl items-center flex",
                "transition-padding duration-200",
                "pl-4 pr-4 hover:pr-2",
                isActive && "pr-2"
              )}
            >
              <p className="whitespace-nowrap">{keyword}</p>
              <Button
                size="icon-sm"
                variant="ghost"
                className={cn(
                  "overflow-hidden bg-transparent hover:bg-transparent text-white hover:text-white cursor-pointer flex-shrink-0",
                  "transition-width duration-200",
                  "w-0 group-hover/item:w-8",
                  isActive && "w-8"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteKeyWord(keyword);
                }}
              >
                <X className="size-4" />
              </Button>
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
