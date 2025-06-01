export interface Login {
  id?: number;
  userId: number;
  user: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
