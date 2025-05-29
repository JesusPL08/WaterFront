export interface Commission {
  id?: number;
  branchId: number;
  userId: number;
  commissionSale: number;
  volume: number;
  dateCreation: string; // formato ISO (ej. 2025-04-29T00:00:00.000Z)
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
