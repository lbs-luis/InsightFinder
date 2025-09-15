import Image from "next/image";
import { NewsMetaData } from "../types/news.types";
import { formatFriendlyDate } from "../utils/formatDate";

interface NewsCardProps {
  article: NewsMetaData;
}
export function NewsCard({ article }: NewsCardProps) {
  const { banner_url, media, subtitle, publication_date, title } = article;
  return (
    <article className="flex bg-app-foreground rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all hover:shadow-lg group">
      <div className="md:flex">
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
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
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

          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
            Ler mais →
          </button>
        </div>
      </div>
    </article>
  );
}
