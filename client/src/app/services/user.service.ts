import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];
  url = 'http://localhost:5000';

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.url}/users`);
    this.users = (await response.json()) ?? [];
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
