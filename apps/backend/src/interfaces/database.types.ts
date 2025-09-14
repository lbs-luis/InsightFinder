export interface IMedia {
  id: number;
  is_active: boolean;
  name: string;
  logo_url: string | null;
  base_url: string;
}

export interface ICategory {
  id: number;
  name: string;
}
