import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean;

  constructor(private loginService: LoginService) {
    // Subscribe to login status changes
    this.loginService.loginStatus.subscribe((status) => {
      this.isLoggedIn = status;
    });

    // Initialize isLoggedIn based on the user's login status
    this.isLoggedIn = this.loginService.isLoggedIn();
  }

  logout(): void {
    this.loginService.logout();
    // Optional: Navigate to a different route after logout
    // this.router.navigate(['/']);
  }
}
