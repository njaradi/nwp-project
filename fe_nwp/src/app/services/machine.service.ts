import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs";
import {Machine} from "../model";

@Injectable({
  providedIn: 'root'
})
export class MachineService{

  private readonly apiUrl = 'http://localhost:8080/api/machines';

  constructor(private http: HttpClient) {
  }

  // GET /api/machines/my
  getMyMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${this.apiUrl}/my`);
  }

  // GET /api/machines/my/filter
  filterMyMachines(
    name?: string,
    state?: string,
    from?: string,
    to?: string
  ): Observable<Machine[]> {

    let params = new HttpParams();

    if (name)  params = params.set('name', name);
    if (state) params = params.set('state', state);
    if (from)  params = params.set('from', from);
    if (to)    params = params.set('to', to);

    return this.http.get<Machine[]>(`${this.apiUrl}/my/filter`, { params });
  }

  // GET /api/machines/{id}
  getMachineById(id: number): Observable<Machine> {
    return this.http.get<Machine>(`${this.apiUrl}/${id}`);
  }

  // POST /api/machines
  createMachine(machineName: String): Observable<Machine> {
    const machine = {
      name: machineName,
      state: 'STOPPED',
      active: true
    };
    return this.http.post<Machine>(this.apiUrl, machine);
  }

  // PUT /api/machines
  updateMachine(machine: Machine): Observable<Machine> {
    return this.http.put<Machine>(this.apiUrl, machine);
  }

  // DELETE /api/machines/{id}
  deleteMachine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // POST /api/machines/{id}/on
  turnOn(id: number): Observable<any> {
    console.log("turnOn fun called")
    return this.http.post(`${this.apiUrl}/${id}/on`, null);
  }

  // POST /api/machines/{id}/off
  turnOff(id: number): Observable<any> {
    console.log("turnOff fun called")
    return this.http.post(`${this.apiUrl}/${id}/off`, null);
  }

  // POST /api/machines/{id}/restart
  restart(id: number): Observable<any> {
    console.log("restart fun called")
    return this.http.post(`${this.apiUrl}/${id}/restart`, null);
  }
}
