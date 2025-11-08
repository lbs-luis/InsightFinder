"use client";
import { X } from "lucide-react";
import { cn } from "../utils/cn";
import { parseKeywords, removeKeyword } from "../utils/keyword-utils";
import { useQueryParams } from "../utils/use-query-params";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function SearchTags() {
  const { set, get } = useQueryParams();

  const keywordsArray = parseKeywords(get("keywords"));

  const deleteKeyWord = (keyword: string) => {
    const rawKeyWords = get("keywords");
    if (!rawKeyWords) return;
    const newKeyWordArray = removeKeyword(rawKeyWords, keyword);
    set("keywords", newKeyWordArray);
  };

  return (
    <div
      className={cn(
        "w-full px-4 mt-4 transition-all duration-300",
        keywordsArray.length > 0 ? "h-[2.375rem] mt-4" : "h-0 mt-0"
      )}
    >
      <div className="max-w-7xl w-full flex gap-4 overflow-x-auto h-full mx-auto">
        {keywordsArray.map((keyword, i) => (
          <Badge
            key={`keyword-badge-${i}`}
            className={cn(
              `group/item`,
              "bg-app-foreground border border-gray-700 text-white pl-4 pr-4 hover:pr-2 font-medium text-sm rounded-xl items-center flex transition-all duration-200"
            )}
          >
            <p>{keyword}</p>
            <Button
              size="icon-sm"
              variant="ghost"
              className={cn(
                `overflow-hidden w-0 group-hover/item:size-8`,
                "bg-transparent hover:bg-transparent text-white hover:text-white cursor-pointer",
                "transition-all duration-150"
              )}
              onClick={() => deleteKeyWord(keyword)}
            >
              <X />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
