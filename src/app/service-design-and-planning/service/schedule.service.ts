import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, forkJoin, mergeMap, of, map } from 'rxjs';
import { ScheduleEntity } from '../model/schedule.entity';
import { RequestEntity } from '../model/request.entity';
import { TechnicianEntity } from '../model/technician.entity';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private schedulesUrl = `${environment.serverBasePath}${environment.schedulesEndpoint}`;

  private baseUrl = environment.serverBasePath;

  constructor(private http: HttpClient) {}

  create(schedule: ScheduleEntity): Observable<ScheduleEntity> {
    return this.http.post<ScheduleEntity>(this.schedulesUrl, schedule);
  }

  update(id: number, schedule: ScheduleEntity): Observable<ScheduleEntity> {
    return this.http.put<ScheduleEntity>(`${this.schedulesUrl}/${id}`, schedule);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.schedulesUrl}/${id}`);
  }

  getByTechnician(technicianId: number): Observable<ScheduleEntity[]> {
    return this.http.get<ScheduleEntity[]>(`${this.baseUrl}/technicians/${technicianId}/schedules`);
  }
  getAll(): Observable<ScheduleEntity[]> {
    return this.http.get<ScheduleEntity[]>(`${this.baseUrl}/schedules`);
  }
}

