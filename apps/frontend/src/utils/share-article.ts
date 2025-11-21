import { NewsMetaData } from "../types/news.types";

export const shareNewsToWhatsApp = (news: NewsMetaData) => {
  const signature = "InsightFinder";
  const text = `${news.title}\n\nPor @${news.media.name}: ${news.link}\n\n${signature}`;
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://api.whatsapp.com/send/?text=${encodedText}&type=custom_url&app_absent=0`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
};
