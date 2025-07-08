import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../model/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8091/api/v1'; // Ajusta si usas otra ruta base

  constructor(private http: HttpClient) {}

  // Obtener todos los reportes
  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/reports`);
  }

  // Obtener reporte por ID
  getById(reportId: string): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/reports/${reportId}`);
  }

  getByRequestId(requestId: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/reports/requests/${requestId}`);
  }

  // Obtener reportes por Technician
  getByTechnicianId(technicianId: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/technicians/${technicianId}/reports`);
  }

  // Crear nuevo reporte
  create(report: Partial<Report>): Observable<string> {
    return this.http.post(`${this.apiUrl}/reports`, report, { responseType: 'text' });
  }

  // Eliminar reporte
  delete(reportId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/reports/${reportId}`);
  }
}
