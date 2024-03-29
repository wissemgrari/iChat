import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { LoginRequest, User } from 'types/global-types';
import { StorageService } from './storage.service';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Observable, map } from 'rxjs';
import { setUserFromOauth2 } from '../utils/userFromOauth2';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private storageService: StorageService,
    private http: HttpClient,
  ) {}

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

  getGoogleLoginUrl(): Observable<any> {
    return this.http.get(`${this.API_URL}/oauth2/google_url`);
  }

  getUserFromOauth2ResourceServer(code: string): Observable<boolean> {
    return this.http
      .get<Token>(`${this.API_URL}/oauth2/callback?code=${code}`, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<Token>) => {
          if (response.status === 200 && response.body !== null) {
            this.setUser(setUserFromOauth2(response.body))
            this.storageService.saveUser(setUserFromOauth2(response.body));
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout(): Observable<any> {
    this.storageService.clean();
    this.user = null;
    return this.http.post(`${this.API_URL}/auth/logout`, httpOptions);
  }
}
