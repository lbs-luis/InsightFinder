export interface MediaMetaData {
  name: string;
  logo_url: string | null;
}

export interface CategoryMetaData {
  name: string;
}

export interface NewsMetaData {
  id: number;
  title: string;
  subtitle: string;
  link: string;
  banner_url: string;
  publication_date: string;
  media: MediaMetaData;
  category: CategoryMetaData;
}
