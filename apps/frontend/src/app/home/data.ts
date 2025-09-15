export interface NewsItem {
  id: string;
  title: string;
  content: string;
  link: string;
  media: string;
  timeAgo: string;
  category: string;
}
export const mockNews: NewsItem[] = [
  {
    id: "1",
    title:
      "Conflitos no Oriente Médio intensificam tensões diplomáticas globais",
    content:
      "Novos desenvolvimentos na região provocam reações internacionais e discussões sobre política externa.",
    media: "Le Monde",
    timeAgo: "2h",
    category: "politics",
    link: "",
  },
];
