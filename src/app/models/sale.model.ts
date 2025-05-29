export interface Sale {
  id?: number;
  branchId: number;
  commissionId: number;
  userId: number;
  volume: number;
  payType: number;
  invoiced: boolean;
  uuid: string;
  invoiceDate: string;
  folio: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
