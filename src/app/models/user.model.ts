export interface User {
  id?: number;
  name: string;
  phoneNumber: string;
  rfc: string;
  profileId: number;
  salaryId: number;
  hiringDate: string; // ISO format
  branchId: number | null;
  createdAt?: string;
  updatedAt?: string;
}
