import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/users').pipe(
      tap((fetchedUsers) => {
        this.users = fetchedUsers;
      })
    );
  }

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
