import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Client, CompatClient, Stomp } from '@stomp/stompjs';
import { AuthService } from '../auth/auth.service';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private wsURL = environment.wsURL;
  private nickname!: number | undefined;
  stompClient!: CompatClient;


  constructor(private authService: AuthService) {
    this.nickname = authService.getUser()?.id;
    // this.initializeWebSocketConnection()
  }

  initializeWebSocketConnection() {
    // this.stompClient = new Client({
    //   brokerURL: this.wsURL,
    //   onConnect: this.onConnected
    // })
    // this.stompClient.activate()

    const socket = new SockJS('http://localhost:5000/ws')
    this.stompClient = Stomp.over(socket)
    this.stompClient.connect({}, this.onConnected, this.onError)

  }

  onConnected() {
    this.stompClient.subscribe(
      `/user/${this.nickname}/queue/messages`,
      this.onMessageReceived
    );
  }

  onMessageReceived() {
    console.log('message received');
  }

  onError() {
    console.log(
      'Could not connect to WebSocket server.\nPlease refresh this page to try again!'
    );
  }
}
