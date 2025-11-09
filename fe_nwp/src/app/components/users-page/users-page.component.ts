import {Component, OnInit} from '@angular/core';
import {User} from "../../model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit{
  users: User[] = [];

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    // Assign the observable, Angular async pipe will handle subscription
    this.userService.users.subscribe((users) => {
      this.users = users;
    })
  }
  // users: User[] = [
  //   { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  //   { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
  //   { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Manager' }
  // ];


  deleteUser(id: number) {
    this.userService.deleteUser(id);
  }
}
