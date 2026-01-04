import {Component, OnInit} from '@angular/core';
import {User} from "../../model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";

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
      this.userService.getUserById(id).subscribe({
        next: (foundUser) => {
          this.user = { ...foundUser };
        },
        error: () => {
          console.error('User not found');
        }
      });
    }
  }

  // saveEditedUser(user: User){
  //   console.log('Edited user saved:', user);
  //   // later you’ll send it to the server or add it to your list
  // }

  updateUser(updatedUser: User): void {
    console.log('sending user', updatedUser);
    this.userService.updateUser(updatedUser).subscribe({
      next: () => {
        this.router.navigate(['/users']);
      },
      error: err => {
        console.error('Update failed', err);
      }
    });
  }
}
