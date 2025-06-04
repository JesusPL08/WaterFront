export interface RouteDay {
  id?: number;
  status: boolean;
  routeDay: string; // formato ISO (ej. 2025-06-01T00:00:00.000Z)
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
