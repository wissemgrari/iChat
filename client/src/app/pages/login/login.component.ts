import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginRequest } from 'types/global-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  // inject auth service
  authService: AuthService = new AuthService();

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login(e: Event): void {
    e.preventDefault();
    if(this.loginForm.invalid) return;
    this.authService.login(this.loginForm.value as LoginRequest);
  }

}
