import { Component } from '@angular/core';

@Component({
  selector: 'chat-messages',
  template: ` <div class="px-3 py-5 flex flex-col gap-5">
    <chat-message type="received" text="Hi there!"></chat-message>
    <chat-message type="sent" text="Hello!"></chat-message>
    <chat-message type="received" text="What's the news ?"></chat-message>
  </div>`,
  styles: [],
})
export class ChatMessagesComponent {}
