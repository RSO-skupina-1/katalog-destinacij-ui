import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { User } from '../seznami/models/user';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(): void {
    this.loginService.login(this.username, this.password).subscribe(
      (user: User | null) => {
        if (user) {
          //console.log('User logged in successfully')
          user = user[0];
          this.loginService.setLoggedInUser(user);
          this.loginService.updateLoginStatus(true, user.id);
          this.router.navigate(['/destinacije']);
        } else {
          //console.log('Invalid username or password');
          this.errorMessage = 'Invalid username or password';
        }
      }, (error: any) => {
        if (error.status === 401) {
          // Incorrect credentials
          this.errorMessage = 'Incorrect username or password';
        } else {
          // Handle other error scenarios
          console.error('Error during login:', error);
        }
      });
    
  }
}
