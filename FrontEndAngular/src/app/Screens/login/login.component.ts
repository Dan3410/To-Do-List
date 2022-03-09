import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/config/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  constructor(private loginService: LoginService,
    private router: Router) { }

  username: string = "";
  password: string = "";
  passwordHidden: boolean = true;
  errorMessage: string = ""

  showPassword(){
    this.passwordHidden = false;
  }

  hidePassword(){
    this.passwordHidden = true;
  }

  login() {
    try {
      this.loginService.logIn(this.username, this.password)
      this.router.navigate(['/toDos'])
    } catch (error: any) {
      console.log(error)
      this.errorMessage = error;
    }
  }
  ngOnInit(): void {
  }

}
