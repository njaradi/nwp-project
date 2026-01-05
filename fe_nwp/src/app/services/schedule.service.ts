import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduledOperation } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiUrl = 'http://localhost:8080/api/schedule';

  constructor(private http: HttpClient) { }

  // Create a new scheduled operation
  createSchedule(op: ScheduledOperation): Observable<ScheduledOperation> {
    return this.http.post<ScheduledOperation>(this.apiUrl, op);
  }

  // Delete a scheduled operation by ID
  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
