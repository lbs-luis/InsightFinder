import { Share2 } from "lucide-react";
import Image from "next/image";
import { NewsMetaData } from "../types/news.types";
import { formatFriendlyDate } from "../utils/formatDate";
import { shareNewsToWhatsApp } from "../utils/share-article";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface NewsCardProps {
  article: NewsMetaData;
}
export function NewsCard({ article }: NewsCardProps) {
  const { banner_url, media, subtitle, publication_date, title, link } =
    article;
  return (
    <article className="flex bg-app-foreground rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all hover:shadow-lg group shrink-0">
      <div className="md:flex w-full">
        {banner_url.length > 0 && (
          <div className="md:w-1/3 md:h-full shrink-0 w-full h-48">
            <Image
              src={banner_url}
              alt={subtitle}
              width={300}
              height={300}
              className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="w-full p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Avatar className="size-6">
                <AvatarImage src={media.logo_url ?? undefined} />
                <AvatarFallback>{media.name}</AvatarFallback>
              </Avatar>
              <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs font-medium rounded">
                {media.name}
              </span>
              <span className="text-gray-500 text-xs">
                {formatFriendlyDate(publication_date)}
              </span>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {title}
          </h4>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {subtitle}
          </p>

          <div className="flex w-full h-fit justify-between">
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
              <a href={link} target="_blank" rel="noopener noreferrer">
                Ler mais →
              </a>
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-100/5 cursor-pointer rounded-full"
              onClick={() => shareNewsToWhatsApp(article)}
            >
              <Share2 />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
