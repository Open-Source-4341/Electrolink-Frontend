import { ReportType } from './report-type';

export interface Report {
  id: string; // UUID
  requestId: string; // UUID
  reportType: ReportType;
  description: string;
}
