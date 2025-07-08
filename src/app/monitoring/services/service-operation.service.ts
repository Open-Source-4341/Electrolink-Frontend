import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceOperation } from '../model/service-operation';
import {ServiceStatus} from '../model/service-status';

@Injectable({
  providedIn: 'root'
})
export class ServiceOperationService {
  private apiUrl = 'http://localhost:8091/api/v1'; // Cambia si tu backend está en otro puerto o ruta

  constructor(private http: HttpClient) {}

  // Obtener todas las operaciones
  getAll(): Observable<ServiceOperation[]> {
    return this.http.get<ServiceOperation[]>(`${this.apiUrl}/service-operations`);
  }

  // Obtener por ID
  getById(id: string): Observable<ServiceOperation> {
    return this.http.get<ServiceOperation>(`${this.apiUrl}/service-operations/${id}`);
  }

  // Obtener por técnico
  getByTechnicianId(technicianId: string): Observable<ServiceOperation[]> {
    return this.http.get<ServiceOperation[]>(`${this.apiUrl}/technicians/${technicianId}/service-operations`);
  }

  // Crear operación
  create(operation: Partial<ServiceOperation>): Observable<string> {
    return this.http.post(`${this.apiUrl}/service-operations`, operation, { responseType: 'text' });
  }

  // Actualizar estado
  updateStatus(requestId: string, newStatus: string): Observable<void> {
    const body = {
      requestId: requestId,
      newStatus: newStatus
    };
    return this.http.put<void>(
      `${this.apiUrl}/service-operations/status`,
      body
    );
  }
}
