export const rss_named_categories = {
  politica: {
    id: 1,
    name: 'Política',
  },
  ciencia_e_saude: {
    id: 2,
    name: 'Ciência e Saúde',
  },
  economia: {
    id: 3,
    name: 'Economia',
  },
};

type rssCategory = {
  name: string;
  id: number;
};

export const rss_categories: rssCategory[] = Object.values(
  rss_named_categories,
).map((category) => ({
  name: category.name,
  id: category.id,
}));
