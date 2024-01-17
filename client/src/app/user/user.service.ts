import { Injectable } from '@angular/core';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = environment.apiUrl;
}
