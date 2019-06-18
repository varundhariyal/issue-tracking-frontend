import { Component, OnInit } from '@angular/core';
import Typed from "typed.js";
import { UserService } from 'src/app/user.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string
  password: string

  constructor(private userService: UserService, private cookie: CookieService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    var options = {
      strings: ["Report", "Assign", "Watch"],
      typeSpeed: 100,
      smartBackspace: true,
      // time before typing starts
      startDelay: 500,
      // backspacing speed
      backSpeed: 150,
      // time before backspacing
      backDelay: 600,
      // loop
      loop: true,
      // false = infinite
      loopCount: 1000,
      // show cursor
      showCursor: false,
      // character for cursor
      cursorChar: "|",
    }
    //getting class name 'typed and passing object options
    var typed = new Typed(".typed", options);
  }

  //method for login
  public login = () => {
    if (this.email === '' || this.email === undefined || this.email === null) {
      this.toastr.error('Please enter user email')
    }
    else if (this.password === '' || this.password === undefined || this.password === null) {
      this.toastr.error('Please enter a password')
    }
    else {
      let data = {
        email: this.email,
        password: this.password
      }
      this.userService.login(data).subscribe(
        response => {
          if (response.status === 200 && response !== null) {
            this.cookie.set('authToken', response.data.authToken)
            this.cookie.set('userId', response.data.userDetails.userId)
            this.cookie.set('userName', response.data.userDetails.FirstName + ' ' + response.data.userDetails.LastName)
            this.userService.setUserInfoInLocalStorage(response.data.userDetails) //userDetails saved in local storage
            this.router.navigate(['/home', response.data.userDetails.userId])
          }
          else {
            this.toastr.error(response.message)
          }
        },
        error => {
          console.log(error)
          if (error.status == 404 || error.status == 400) {
            this.toastr.error(error.error.message)
          }
          else if (error.status == 500) {
            this.router.navigate(['/servererror'])
          }
        }
      )
    }
  }

}
