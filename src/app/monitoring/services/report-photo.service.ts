import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportPhoto } from '../model/report-photo';

@Injectable({
  providedIn: 'root'
})
export class ReportPhotoService {
  private apiUrl = 'http://localhost:8091/api/v1'; // Ajusta si tu ruta base es distinta

  constructor(private http: HttpClient) {}

  // Subir nueva foto de reporte
  create(photo: Partial<ReportPhoto>): Observable<string> {
    return this.http.post(`${this.apiUrl}/photos`, photo, { responseType: 'text' });
  }
}
