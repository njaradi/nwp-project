import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Machine, User} from "../model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService{
  private readonly apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {
  }

  // GET /api/users/all
  getAllUsers(): Observable<User[]>  {
    console.log("get all users in front");
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  // GET /api/users/{id}
  getUserById(id: number): Observable<User>  {
    console.log("getUserById " + id);
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // PUT /api/users
  updateUser(updatedUser: User): Observable<User> {
    console.log("updateUser" + updatedUser);
    return this.http.put<User>(this.apiUrl, updatedUser)
  }

  // POST /api/user
  createUser(newUser: User):Observable<User>{
    console.log("createUser" + newUser);
    return this.http.post<User>(this.apiUrl, newUser);
  }

  // DELETE /api/machines/{id}
  deleteUser(id: number): Observable<void>{
    console.log("delete user in front");
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
