export interface Client {
  id?: number;
  name: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
