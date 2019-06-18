import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from "@angular/forms";
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class UserManagementModule { }
