import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { correctPassword, passwordNotEmpty, usernameExists, userNotEmpty } from '../Utils/CheckLoginForm';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: EventEmitter<boolean> = new EventEmitter()
  constructor() {
    /* Its looks like the services are constructed before the components,
    so this code will actually do nothing in terms of what the component should show
    localStorage.getItem("isLoggedIn") ?
      this.isLoggedIn.emit(Boolean(localStorage.getItem("isLoggedIn"))) :
      this.isLoggedIn.emit(false);
    */
  }

  getIsLoggedIn() {
    localStorage.getItem("isLoggedIn") ?
      this.isLoggedIn.emit(Boolean(localStorage.getItem("isLoggedIn"))) :
      this.isLoggedIn.emit(false);
  }

  logIn(username: string, password: string) {
    userNotEmpty(username);
    passwordNotEmpty(password);
    usernameExists(username);
    correctPassword(password);
      this.isLoggedIn.emit(true);
      localStorage.setItem("isLoggedIn", String(true));
  }

  LogOut() {
    this.isLoggedIn.emit(false);
    localStorage.setItem("isLoggedIn", String(false));

  }
}
