export interface Attendance {
  id?: number;
  userId: number;
  date: string; // formato ISO string
  attendanceTypeId: number;
  workedHours: number;
  paid: boolean;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
