import { Component, OnInit } from '@angular/core';
import Typed from "typed.js";
import { UserService } from 'src/app/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  firstName: string
  lastName: string
  email: string
  mobileNumber: number
  password: string
  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) { }

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

  //method for signup
  signup = () => {
    if (!this.firstName) {
      this.toastr.warning('Please Enter First Name')
    }

    else if (!this.lastName) {
      this.toastr.warning('Please enter Last Name')

    } else if (!this.mobileNumber) {
      this.toastr.warning('Please Enter mobile number!')

    } else if (!this.email) {
      this.toastr.warning('Please Enter Email')

    } else if (!this.password) {
      this.toastr.warning('Please enter password!')
    }
    else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        mobileNumber: this.mobileNumber
      }
      this.userService.signup(data).subscribe(
        response => {
          if (response.status == 200) {
            this.toastr.success("Signup Successfull")
            setTimeout(() => {
              this.router.navigate(['/login'])
            }, 1000)
          }
          else {
            this.toastr.warning(response.message)
          }
        },
        error => {
          this.toastr.warning(error.error.message)
          if (error.status == 0 || error.status == 500 || error.error.status == 500) {
            this.router.navigate(['/servererror'])
          }
        }
      ) //end subscribe
    }
  } //end signup method

}
