import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { LoginRequest, User } from 'types/global-types';
import { StorageService } from './storage.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) {
  }

  private API_URL = environment.apiUrl;
  private user: User | null = this.storageService.getUser();

  getUser(): User | null {
    return this.user;
  }

  setUser(user: User): void {
    this.user = user;
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(
      `${this.API_URL}/auth/login`,
      loginRequest,
      httpOptions
    );
  }
}
