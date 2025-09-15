export interface ArticleMedia {
  name: string;
  logo_url: string | null;
}

export interface ArticleCategory {
  name: string;
}

export interface ArticleResponse {
  id: number;
  title: string;
  subtitle: string;
  link: string;
  banner_url: string;
  publication_date: Date;
  media: ArticleMedia;
  category: ArticleCategory;
}
