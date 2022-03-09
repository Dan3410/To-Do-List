import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: EventEmitter<boolean> = new EventEmitter()
  constructor() {
    console.log(localStorage.getItem("isLoggedIn") ? true : false)
    localStorage.getItem("isLoggedIn") ?
      this.isLoggedIn.emit(Boolean(localStorage.getItem("isLoggedIn"))) :
      this.isLoggedIn.emit(false);
  }

  getIsLoggedIn() {
    localStorage.getItem("isLoggedIn") ?
      this.isLoggedIn.emit(Boolean(localStorage.getItem("isLoggedIn"))) :
      this.isLoggedIn.emit(false);
  }

  logIn(username: string, password: string) {
    if (username === "user" && password === "password") {
      this.isLoggedIn.emit(true);
      localStorage.setItem("isLoggedIn", String(true));
    } else {
      throw ("Invalid Credentials")

    }
  }

  LogOut() {
    this.isLoggedIn.emit(false);
    localStorage.setItem("isLoggedIn", String(false));

  }
}
