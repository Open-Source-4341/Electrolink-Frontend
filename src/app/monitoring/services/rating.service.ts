import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from '../model/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'http://localhost:8091/api/v1'; // Cambiar si usas otra ruta base

  constructor(private http: HttpClient) {}

  // Obtener todas las calificaciones
  getAll(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiUrl}/ratings`);
  }

  // Obtener por ID
  getById(ratingId: string): Observable<Rating> {
    return this.http.get<Rating>(`${this.apiUrl}/ratings/${ratingId}`);
  }

  // Obtener por technicianId
  getByTechnicianId(technicianId: string): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiUrl}/technicians/${technicianId}/ratings`);
  }

  // Obtener por requestId
  getByRequestId(requestId: string): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiUrl}/ratings/requests/${requestId}`);
  }

  // Crear nueva calificación
  create(rating: Partial<Rating>): Observable<string> {
    return this.http.post(`${this.apiUrl}/ratings`, rating, { responseType: 'text' });
  }

  // Actualizar calificación
  update(ratingId: string, rating: Partial<Rating>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/ratings/${ratingId}`, rating);
  }

  // Eliminar calificación
  delete(ratingId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/ratings/${ratingId}`);
  }
}
