import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/config/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService,
    private router: Router) {
      this.loginService.isLoggedIn.subscribe(logged => this.changeLoggedIn(logged))
  }

  isLoggedIn: boolean = false;

  private changeLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }

  logOut() {
    this.loginService.LogOut()
    this.router.navigate([""])
  }

  ngOnInit(): void {
    this.loginService.isLoggedIn.subscribe(logged => this.changeLoggedIn(logged))
  }

}
