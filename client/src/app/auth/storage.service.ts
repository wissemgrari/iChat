import { Injectable } from '@angular/core';
import { Chat, User } from 'types/global-types';

const USER_KEY = 'auth-user';
const USER_CHATS = 'user-chats';

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

  public saveChats(chats: Chat[]) :void {
    // remove any exisiting saved chats
    window.sessionStorage.removeItem(USER_CHATS);
    // save the chats
    window.sessionStorage.setItem(USER_CHATS, JSON.stringify(chats))
  }

  public getChats(): Chat[] | null {
    const chats = window.sessionStorage.getItem(USER_CHATS)
    if(chats) {
      return JSON.parse(chats)
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
