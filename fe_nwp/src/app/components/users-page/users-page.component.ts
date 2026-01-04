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
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }


  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe();
  }
}
