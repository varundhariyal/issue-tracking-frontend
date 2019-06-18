import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../dashboard/home/home.component';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'signup', component: SignupComponent, pathMatch: 'full' },
      { path: 'dash/:userId', component: HomeComponent, pathMatch: 'full' }
    ])
  ]
})
export class UserManagementModule { }
