"use client";

import { NewsMetaData } from "@/src/types/news.types";
import { useCallback, useEffect, useState } from "react";
import { getNewsMetaData } from "../services/news.service";
import { useNewsCategoriesStore } from "../store/news-categories";
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
  const { category } = useNewsCategoriesStore();

  const handleLoadMore = useCallback(async () => {
    setIsLoading(true);
    const nextPage = page + 1;
    const newNews = await getNewsMetaData(nextPage, category);

    if (newNews.length > 0) {
      setNews((prevNews) => [...prevNews, ...newNews]);
      setPage(nextPage);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setIsNewsEmpty(true);
    return;
  }, [category, page]);

  useEffect(() => {
    const resetAndFetchFirstPage = async () => {
      setIsLoading(true);
      setNews([]);
      setPage(1);

      const initialNewsForCategory = await getNewsMetaData(1, category);

      setNews(initialNewsForCategory);
      setIsNewsEmpty(initialNewsForCategory.length === 0);
      setIsLoading(false);
    };

    resetAndFetchFirstPage();
  }, [category]);

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
