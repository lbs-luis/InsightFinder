import { CategoryBar } from "@/src/components/categories-bar";
import { NewsList } from "@/src/components/news-list";

import { AppBody } from "@/src/layout/body";
import { getNewsMetaData } from "@/src/services/news.service";
import { NewsMetaData } from "@/src/types/news.types";

export default async function Home() {
  const initialNews: NewsMetaData[] = await getNewsMetaData(1);

  return (
    <div className="flex flex-col flex-1">
      <CategoryBar />
      <AppBody className="gap-4">
        <NewsList initialNews={initialNews} />
      </AppBody>
    </div>
  );
}
