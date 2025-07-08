import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ServiceEntity } from '../model/service.entity';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private servicesUrl = `${environment.serverBasePath}${environment.servicesEndpoint}`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ServiceEntity[]> {
    return this.http.get<ServiceEntity[]>(this.servicesUrl);
  }

  create(service: any): Observable<number> {
    const token = localStorage.getItem('token'); // o de donde lo estés guardando
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post<number>(this.servicesUrl, service, { headers });
  }

}
