import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];
  private url = environment.apiUrl;

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.url}/users`);
    this.users = (await response.json()) ?? [];
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
