import { Component } from '@angular/core';
import {User} from "../../model";

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.css']
})
export class EditUserPageComponent {
  saveEditedUser(user: User){
    console.log('Edited user saved:', user);
    // later you’ll send it to the server or add it to your list
  }
}
