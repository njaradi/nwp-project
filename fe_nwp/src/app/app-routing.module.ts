import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MachinesPageComponent} from "./components/machines-page/machines-page.component"
import {UsersPageComponent} from "./components/users-page/users-page.component"
import {AddUserPageComponent} from "./components/add-user-page/add-user-page.component"
import {EditUserPageComponent} from "./components/edit-user-page/edit-user-page.component"
import {ErrorPageComponent} from "./components/error-page/error-page.component"
import {LoginPageComponent} from "./components/login-page/login-page.component"


const routes: Routes = [
  {
    path: "",
    component: MachinesPageComponent
  },
  {
    path: "users",
    component: UsersPageComponent
  },
  {
    path: "users/new",
    component: AddUserPageComponent
  },
  {
      path: "users/edit/:id",
      component: EditUserPageComponent
  },
  {
      path: "error",
      component: ErrorPageComponent
  },
  {
      path: "login",
      component: LoginPageComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
