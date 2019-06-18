import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
// import observable
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = `${environment.baseUrl}/users/`

  constructor(private http: HttpClient) { }

  //method to get user infom from local storage
  public getUserInfoFromLocalstorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage

  //method to set/send data to local storage
  public setUserInfoInLocalStorage = (data) => {

    localStorage.setItem('userInfo', JSON.stringify(data))

  }

  //method to login
  public login(data: any): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)
    return this.http.post(`${this.url}login`, params)
  }

  //method to signup
  public signup(data: any): Observable<any> {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('email', data.email)
      .set('password', data.password)
      .set('mobileNumber', data.mobileNumber)
    return this.http.post(`${this.url}signup`, params)
  }

  //method to logout
  public logout(data: any): Observable<any> {
    const params = new HttpParams()
      .set('userId', data.userId)
    return this.http.post(`${this.url}logout`, params)
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError

}
