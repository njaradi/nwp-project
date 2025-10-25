import { Component } from '@angular/core';


interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent {
  users: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Manager' }
  ];

  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
  }
}
