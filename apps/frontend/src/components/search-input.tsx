"use client";

import { CornerDownRight } from "lucide-react";
import type { KeyboardEvent } from "react";
import { ChangeEvent, useRef } from "react";
import { useSearchBarStore } from "../store/search-bar";
import {
  cleanOrphanModifiers,
  parseKeywords,
  sanitizeKeyword,
} from "../utils/keyword-utils";
import { useQueryParams } from "../utils/use-query-params";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function SearchInput() {
  const { isOpen } = useSearchBarStore();
  const { set, get } = useQueryParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const sanitized = sanitizeKeyword(value);

    if (inputRef.current) {
      inputRef.current.value = sanitized;
    }
  };

  const addKeyword = () => {
    if (!inputRef.current || !inputRef.current.value.trim()) return;

    const currentKeywords = get("keywords") || "";
    const newKeyword = cleanOrphanModifiers(inputRef.current.value.trim());

    const existingKeywords = parseKeywords(currentKeywords);

    if (existingKeywords.includes(newKeyword)) {
      inputRef.current.value = "";
      return;
    }

    const keywords = currentKeywords
      ? `${currentKeywords}/${newKeyword}`
      : newKeyword;

    set("keywords", keywords);

    inputRef.current.value = "";
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <div
      className="px-4 w-full h-[2.375rem] transition-all duration-300"
      style={{ marginTop: isOpen ? "1rem" : "calc(-2.375rem - 2px)" }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="md:max-w-xl w-full flex items-center text-white gap-1 border border-gray-700 rounded-lg bg-app-foreground">
          <Input
            ref={inputRef}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="border-none rounded-tr-none rounded-br-none"
            placeholder="palavra-chave"
          />
          <Button
            variant="ghost"
            size="icon"
            className="text-app-text hover:text-white bg-transparent hover:bg-transparent cursor-pointer rounded-tl-none rounded-bl-none rounded-tr-lg rounded-br-lg  focus-visible:text-white"
            onClick={addKeyword}
          >
            <CornerDownRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
