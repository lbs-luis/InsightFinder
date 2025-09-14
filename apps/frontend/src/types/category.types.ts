export interface ICategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}
