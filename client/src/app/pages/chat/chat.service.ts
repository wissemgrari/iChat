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
export class ChatService implements OnInit {
  private API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private rxStompService: RxStompService
  ) {}

  ngOnInit(): void {}

  getChatMessages(chatID: string): Observable<any> {
    return this.http.get(`${this.API_URL}/messages/${chatID}`, httpOptions);
  }

  sendMessage(request: MessageRequest) {
    this.rxStompService.publish({
      destination: `/app/${request.chatID}/send`,
      body: JSON.stringify(request.message),
    });
  }
}
