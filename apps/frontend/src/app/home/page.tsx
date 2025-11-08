import { AssistantSidePanel } from "@/src/components/assistant-side-panel";
import { CategoryBar } from "@/src/components/categories-bar";
import { NewsList } from "@/src/components/news-list";
import { SearchInput } from "@/src/components/search-input";
import { SearchTags } from "@/src/components/search-tags";
import { AppBody } from "@/src/layout/body";
import { getNewsMetaData } from "@/src/services/news.service";
import { NewsMetaData } from "@/src/types/news.types";
import { NewsSectionWrapper } from "./components/news-section-wrapper";
import { SideMenuPlaceHolder } from "./components/side-menu-placeholder";

export default async function Home() {
  const initialNews: NewsMetaData[] = await getNewsMetaData(1);

  return (
    <AppBody className="flex flex-row">
      <NewsSectionWrapper>
        <SearchInput />
        <SearchTags />
        <CategoryBar className="mt-4" />
        <NewsList initialNews={initialNews} />
      </NewsSectionWrapper>

      <SideMenuPlaceHolder />
      <AssistantSidePanel />
    </AppBody>
  );
}
