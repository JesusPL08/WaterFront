export interface ticket {
  id?: number;
  branchId: number;
  payType: number;
  invoiced: boolean;
  uuid: string;
  invoiceDate: string; // Formato ISO, ej. "2025-06-04T00:00:00.000Z"
  folio: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
