import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/storage.service';
import { Chat } from 'types/global-types';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  private API_URL = environment.apiUrl;
  private chats: Chat[] = this.storageService.getChats() ?? [];

  // get the chats of the current user
  getChats(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/chats`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  setChats(data: Chat[]) {
    this.chats = data;
  }

}
