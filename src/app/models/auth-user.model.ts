import { Profile } from './profile.model';

export interface AuthUser {
  id: number;
  profileId: number;
  salaryId: number;
  name: string;
  phoneNumber: string;
  rfc: string;
  hiringDate: string;
  branchId: number | null;
  areaId: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  profile: Profile;
}
