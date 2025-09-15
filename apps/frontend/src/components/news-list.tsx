"use client";

import { getNewsMetaData } from "@/src/services/news.service";
import { NewsMetaData } from "@/src/types/news.types";
import { useState } from "react";
import { cn } from "../utils/cn";
import { NewsCard } from "./news-card";

interface NewsListProps {
  initialNews: NewsMetaData[];
}

export function NewsList({ initialNews }: NewsListProps) {
  const [isNewsEmpty, setIsNewsEmpty] = useState<boolean>(false);
  const [news, setNews] = useState<NewsMetaData[]>(initialNews);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoadMore = async () => {
    setIsLoading(true);
    const nextPage = page + 1;
    const newNews = await getNewsMetaData(nextPage);

    if (newNews.length > 0) {
      setNews((prevNews) => [...prevNews, ...newNews]);
      setPage(nextPage);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setIsNewsEmpty(true);
    return;
  };

  return (
    <>
      {news.length > 0 &&
        news.map((article) => <NewsCard key={article.id} article={article} />)}

      <button
        className={cn(
          "mx-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer",
          isNewsEmpty && "hidden"
        )}
        onClick={handleLoadMore}
        disabled={isLoading}
      >
        {isLoading ? "Carregando..." : "Carregar mais notícias"}
      </button>
    </>
  );
}
