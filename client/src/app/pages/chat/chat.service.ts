import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';
import { StompService } from 'src/app/ws/stomp.service';
import { MessageRequest } from 'types/global-types';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ChatService implements OnInit {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient, private stomp: StompService) {}

  ngOnInit(): void {}

  getChatMessages(chatID: string): Observable<any> {
    return this.http.get(`${this.API_URL}/messages/${chatID}`, httpOptions);
  }

  sendMessage(request: MessageRequest) {
    this.stomp.send(
      `/app/${request.chatID}/send`,
      {},
      JSON.stringify(request.message)
    );
  }
}
