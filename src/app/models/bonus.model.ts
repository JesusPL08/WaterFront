export interface Bonus {
  id?: number;
  userId: number;
  amount: number;
  description: string;
  date: string; // formato ISO, ej. "2025-04-30T00:00:00.000Z"
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
