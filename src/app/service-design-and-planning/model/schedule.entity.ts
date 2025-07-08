export class ScheduleEntity {
  id?: number;
  technicianId: number;
  day: string;
  startTime: string;
  endTime: string;

  constructor() {
    this.technicianId = 0;
    this.day = '';
    this.startTime = '';
    this.endTime = '';
  }
}
