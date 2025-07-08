import { ServiceStatus } from './service-status';

export interface ServiceOperation {
  id: string; // UUID
  requestId: string; // UUID
  technicianId: string; // UUID
  startedAt: string;
  completedAt: string;
  currentStatus: ServiceStatus;
}
