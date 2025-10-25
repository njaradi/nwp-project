import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { AddUserPageComponent } from './components/add-user-page/add-user-page.component';
import { EditUserPageComponent } from './components/edit-user-page/edit-user-page.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MachinesPageComponent } from './components/machines-page/machines-page.component';
import { FilterMachinesComponent } from './components/filter-machines/filter-machines.component';
import { NewMachineComponent } from './components/new-machine/new-machine.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UsersPageComponent,
    AddUserPageComponent,
    EditUserPageComponent,
    UserFormComponent,
    MachinesPageComponent,
    FilterMachinesComponent,
    NewMachineComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
