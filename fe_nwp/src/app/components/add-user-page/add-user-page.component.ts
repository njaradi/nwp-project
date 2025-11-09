import { Component } from '@angular/core';
import {User} from "../../model";

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.css']
})
export class AddUserPageComponent {
  createUser(user: User) {
    console.log('New user created:', user);
    // later you’ll send it to the server or add it to your list
  }
}
