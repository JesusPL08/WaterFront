export interface Expense {
  id?: number;
  costId: number;
  expenseTypeId: number;
  units: number;
  total: number;
  date: string; // formato ISO: yyyy-MM-ddTHH:mm:ss.sssZ
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
