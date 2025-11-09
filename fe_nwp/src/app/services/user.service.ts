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
    this.usersSubject.next([
      { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
      { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' }
    ]);
  }

  getUserById(id: number): User | undefined {
    const currentUsers = this.usersSubject.value;
    return currentUsers.find(user => user.id === id);
  }

  updateUser(updatedUser: User){
    const currentUsers = this.usersSubject.value;

    const updatedList = currentUsers.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );

    this.usersSubject.next(updatedList);
  }
  createUser(newUser: User){
    const currentUsers = this.usersSubject.value;
    const userWithId = { ...newUser, id: currentUsers.length + 1 };

    const updatedList = [...currentUsers, userWithId];
    this.usersSubject.next(updatedList);
  }
  deleteUser(id: number){
    const currentUsers = this.usersSubject.value;
    const updatedList = currentUsers.filter(user => user.id !== id);

    this.usersSubject.next(updatedList);
  }
}
