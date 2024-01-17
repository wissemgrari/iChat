import { Injectable } from '@angular/core';
import { User } from 'types/global-types';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: User): void {
    // remove any existing user data
    window.sessionStorage.removeItem(USER_KEY); 
    // save the user data
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
