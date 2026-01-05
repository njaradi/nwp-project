import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {UserService} from "./user.service";
import {User} from "../model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) { }

  getUserFromToken(): Observable<User> | null {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);

      return this.userService.getUserById(decodedToken.userId);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
