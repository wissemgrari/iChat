import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';
import { WebSocketService } from 'src/app/ws/ws.service';
import { MessageRequest } from 'types/global-types';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient, private ws: WebSocketService) {
    this.ws.initializeWebSocketConnection();
  }

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
    this.ws.stompClient.send(
      `/app/${request.chatID}/send`,
      {},
      JSON.stringify(request.message)
    );
  }
}
