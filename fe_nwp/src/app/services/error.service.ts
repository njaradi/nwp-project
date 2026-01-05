import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorMessage } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private apiUrl = 'http://localhost:8080/api/errors';

  constructor(private http: HttpClient) {}

  // GET /api/errors/all  (ADMIN)
  getAllErrors(): Observable<ErrorMessage[]> {
    return this.http.get<ErrorMessage[]>(`${this.apiUrl}/all`);
  }

  // GET /api/errors/my  (ADMIN, MODERATOR, USER)
  getMyErrors(): Observable<ErrorMessage[]> {
    return this.http.get<ErrorMessage[]>(`${this.apiUrl}/my`);
  }

  // GET /api/errors/{id}
  getErrorById(id: number): Observable<ErrorMessage> {
    return this.http.get<ErrorMessage>(`${this.apiUrl}/${id}`);
  }

  // POST /api/errors
  createError(error: ErrorMessage): Observable<ErrorMessage> {
    return this.http.post<ErrorMessage>(this.apiUrl, error);
  }

  // PUT /api/errors
  updateError(error: ErrorMessage): Observable<ErrorMessage> {
    return this.http.put<ErrorMessage>(this.apiUrl, error);
  }

  // DELETE /api/errors/{id}
  deleteError(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
