export interface DeliveryBranch {
  id?: number;
  userId: number;
  branchId: number;
  priority: number;
  ticketId?:  number | null;
  status: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
