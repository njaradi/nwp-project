import {Component, OnInit} from '@angular/core';
import {User} from "../../model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.css']
})
export class EditUserPageComponent implements OnInit{
  user: User | null = null;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
  }
  ngOnInit(): void {
    // read the user id from the route parameters
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      const foundUser = this.userService.getUserById(id);
      if (foundUser) {
        this.user = {...foundUser}; // clone it to avoid mutating directly
      } else {
        console.error('User not found');
      }
    }
  }

  // saveEditedUser(user: User){
  //   console.log('Edited user saved:', user);
  //   // later you’ll send it to the server or add it to your list
  // }
  updateUser(updatedUser: User): void {
    this.userService.updateUser(updatedUser);
    this.router.navigate(['/users']);
  }
}
