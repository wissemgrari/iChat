import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getChatMessages(chatID: string): Observable<any> {
    return this.http.get(`${this.API_URL}/messages/${chatID}`, httpOptions);
  }
}
