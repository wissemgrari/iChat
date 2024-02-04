import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';
import { RxStompService } from 'src/app/rx/rx-stomp.service';
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
    private http: HttpClient,
    private rxStompService: RxStompService
  ) {}

  getChatMessages(chatID: string): Observable<any> {
    return this.http.get(`${this.API_URL}/messages/${chatID}`, httpOptions);
  }

  createChat(userId: number): Observable<any> {
    return this.http.post(
      `${this.API_URL}/chats/create`,
      { userId },
      httpOptions
    );
  }

  sendMessage(request: MessageRequest) {
    this.rxStompService.publish({
      destination: `/app/${request.chatID}/send`,
      body: JSON.stringify(request.message),
    });
  }
}
