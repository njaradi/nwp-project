import { Component } from '@angular/core';
import {ErrorMessage} from "../../model";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent {
  errors: ErrorMessage[] = [];

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorService.getMyErrors().subscribe({
      next: (data) => this.errors = data,
      error: (err) => console.error('Failed to load errors', err)
    });
  }
}
