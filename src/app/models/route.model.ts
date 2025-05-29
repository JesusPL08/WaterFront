export interface Route {
  id?: number;
  branchId: number;
  priority: number;
  volume: number;
  deliveryDate: string; // formato ISO: 'YYYY-MM-DDTHH:mm:ss.sssZ'
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
