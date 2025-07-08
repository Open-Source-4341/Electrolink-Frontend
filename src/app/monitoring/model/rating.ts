export interface Rating {
  id: string; // UUID
  requestId: string; // UUID
  technicianId: string; // UUID
  score: number;
  comment: string;
  raterId: string;
}
