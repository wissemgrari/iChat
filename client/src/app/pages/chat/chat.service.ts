import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';
import { MessageRequest } from 'types/global-types';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  getChatMessages(chatID: string): Observable<any> {
    return this.http.get(`${this.API_URL}/messages/${chatID}`, httpOptions);
  }

  // sendMessage(request: MessageRequest): Observable<any> {
  //   console.log(request)
  //   return this.http.post(
  //     `${this.API_URL}/messages/send/${request.chatID}`,
  //     {
  //       content: request.message,
  //     },
  //     httpOptions
  //   );
  // }

  sendMessage(request: MessageRequest) {
    
  }
}
