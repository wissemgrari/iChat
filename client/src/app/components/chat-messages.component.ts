import { Component } from '@angular/core';

@Component({
  selector: 'chat-messages',
  template: ` <div class="px-3 py-5 flex flex-col gap-5">
    <chat-message type="received" text="Hi there!" date="09:30"></chat-message>
    <chat-message type="sent" text="Hello!" date="09:31"></chat-message>
    <chat-message
      type="received"
      text="What's the news ?"
      date="09:32"
    ></chat-message>
  </div>`,
  styles: [],
})
export class ChatMessagesComponent {}
