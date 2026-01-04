import {Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from "../../model";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnChanges{
  @Input() user: User | null = null;
  @Output() formSubmit = new EventEmitter<User>();

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.userForm.patchValue(this.user);
    }
    }

  onSubmit() {
    if (this.userForm.valid) {
      const userData: User = {
        ...this.user,
        ...this.userForm.value
      };
      this.formSubmit.emit(userData);
    }
  }

}
