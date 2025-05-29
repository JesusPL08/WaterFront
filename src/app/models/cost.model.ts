export interface Cost {
  id?: number;
  price: number;
  supplierId: number;
  productId: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
