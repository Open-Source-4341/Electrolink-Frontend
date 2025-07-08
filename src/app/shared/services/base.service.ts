import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  basePath: string = `${environment.serverBasePath}`;
  resourceEndpoint: string = '/resources';

  constructor(protected http: HttpClient) {}

  // Auth headers (con token)
  getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token');   // <-- clave correcta
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Opciones completas
  getHttpOptions(): { headers: HttpHeaders } {
    return { headers: this.getAuthHeaders() };
  }

  handleError = (error: HttpErrorResponse) => {
    console.group(`❌ HTTP ${error.status} – ${error.url}`);
    console.log('Headers:', error.headers);
    console.log('Body (raw):', error.error);
    try {
      const json =
        typeof error.error === 'string'
          ? JSON.parse(error.error)
          : error.error;
      console.log('Body (JSON):', json);
    } catch {}
    console.groupEnd();

    return throwError(() =>
      new Error(error.error?.message || 'Algo salió mal; inténtalo de nuevo')
    );
  };

  // Create
  create(item: any): Observable<T> {
    return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.getHttpOptions())
      .pipe(retry(2), catchError(this.handleError));
  }

  // Delete
  delete(id: any) {
    return this.http.delete(`${this.resourcePath()}/${id}`, this.getHttpOptions())
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update
  update(id: any, item: any): Observable<T> {
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.getHttpOptions())
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get All
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.resourcePath(), this.getHttpOptions())
      .pipe(retry(2), catchError(this.handleError));
  }

  protected resourcePath(): string {
    return `${this.basePath}${this.resourceEndpoint}`;
  }
}
