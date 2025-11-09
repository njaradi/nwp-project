import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../model";

@Injectable({
  providedIn: 'root'
})
export class UserService{
  // BehaviorSubject holds the current list of users and emits new values whenever updated
  private usersSubject = new BehaviorSubject<User[]>([]);

  // Observable for components to subscribe to (read-only)
  users: Observable<User[]> = this.usersSubject.asObservable();

  constructor() {
    // Optional: preload with some fake users for testing
    this.usersSubject.next([
      { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
      { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' }
    ]);
  }
}
