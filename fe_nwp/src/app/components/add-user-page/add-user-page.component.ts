import { Component } from '@angular/core';
import {User} from "../../model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.css']
})
export class AddUserPageComponent {
  constructor(private userService: UserService, private router: Router) {
  }
  createUser(user: User) {
    this.userService.createUser(user);
    this.router.navigate(['/users']);
  }
}
