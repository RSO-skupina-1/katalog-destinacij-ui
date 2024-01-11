import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean;
  userId: number;

  constructor(private loginService: LoginService, private router: Router) {
    // Subscribe to login status changes
    this.loginService.loginStatus.subscribe((status) => {
      this.isLoggedIn = status;
    });

    // Initialize isLoggedIn based on the user's login status
    this.isLoggedIn = this.loginService.isLoggedIn();

    this.loginService.loginUserId.subscribe((id) => {
      this.userId = id;
    });

    this.userId = this.loginService.getUserId();
  }

  logout(): void {
    this.loginService.logout();
  }

  naProfil(): void {
    this.userId = this.loginService.getUserId();
    this.router.navigate(['/profile/', this.userId]);
  }

  naPriporocila(): void {
    this.userId = this.loginService.getUserId();
    this.router.navigate(['/priporocila/', this.userId]);
  }
}
