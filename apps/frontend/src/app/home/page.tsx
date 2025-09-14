import { CategoryBar } from "@/src/components/categories-bar";
import { AppBody } from "@/src/layout/body";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <CategoryBar />
      <AppBody>
        <h1 className="text-white">TESTEEE</h1>
      </AppBody>
    </div>
  );
}
