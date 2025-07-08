import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, forkJoin, mergeMap, of, map } from 'rxjs';
import { RequestEntity } from '../model/request.entity';
import { PropertyEntity } from '../model/property.entity';
import { ClientEntity } from '../model/client.entity';
import { TechnicianEntity } from '../model/technician.entity';
import { ServiceEntity } from '../model/service.entity';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private requestsUrl = `${environment.serverBasePath}${environment.requestsEndpoint}`;
  private clientsUrl = `${environment.serverBasePath}${environment.clientsEndpoint}`;
  private techniciansUrl = `${environment.serverBasePath}${environment.techniciansEndpoint}`;
  private propertiesUrl = `${environment.serverBasePath}${environment.propertiesEndpoint}`;
  private servicesUrl = `${environment.serverBasePath}${environment.servicesEndpoint}`;

  constructor(private http: HttpClient) {}

  getById(id: string): Observable<RequestEntity> {
    return this.http.get<RequestEntity>(`${this.requestsUrl}/${id}`);
  }

  getByClientId(clientId: string): Observable<RequestEntity[]> {
    return this.http.get<RequestEntity[]>(`${this.requestsUrl}/clients/${clientId}/requests`);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.requestsUrl}/${id}`);
  }

  create(request: RequestEntity): Observable<RequestEntity> {
    const command = {
      clientId: request.clientId,
      technicianId: request.technicianId,
      propertyId: request.propertyId,
      serviceId: request.serviceId,
      problemDescription: request.problemDescription,
      scheduledDate: request.scheduledDate,
      bill: request.bill,
      photos: request.photos
    };
    return this.http.post<RequestEntity>(this.requestsUrl, command);
  }

  update(id: string, request: RequestEntity): Observable<RequestEntity> {
    const command = {
      clientId: request.clientId,
      technicianId: request.technicianId,
      propertyId: request.propertyId,
      serviceId: request.serviceId,
      problemDescription: request.problemDescription,
      scheduledDate: request.scheduledDate,
      bill: request.bill,
      photos: request.photos
    };
    return this.http.put<RequestEntity>(`${this.requestsUrl}/${id}`, command);
  }

}
