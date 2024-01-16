import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { LoginRequest } from 'types/global-types';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url = environment.apiUrl;

  async login(loginRequest: LoginRequest): Promise<void> {
    const response = await fetch(`${this.url}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(loginRequest),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
  }

}