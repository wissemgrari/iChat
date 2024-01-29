import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { StorageService } from 'src/app/auth/storage.service';
import { LoginRequest } from 'types/global-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{

  private formGroup!: FormGroup;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(10),
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(8),
        Validators.required,
      ]),
    });
  }

  get email() {
    return this.formGroup.get('email')
  }
  
  get password() {
    return this.formGroup.get('password')
  }

  get loginForm() {
    return this.formGroup;
  }
  

  login(e: Event): void {
    e.preventDefault();
    if (this.formGroup.invalid) return;

    this.authService.login(this.formGroup.value as LoginRequest).subscribe({
      next: (data) => {
        this.storageService.saveUser(data.user);
        this.authService.setUser(data.user);

        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
