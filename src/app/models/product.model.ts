export interface Product {
  id?: number;
  name: string;
  description: string;
  brand: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
