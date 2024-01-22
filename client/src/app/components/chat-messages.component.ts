import { Component, Input } from '@angular/core';
import { Message, User } from 'types/global-types';

@Component({
  selector: 'chat-messages',
  template: ` <div
    class="px-3 py-2 flex flex-col gap-2"
    *ngFor="let message of messages"
  >
    <chat-message
      [type]="user?.id == message.senderID ? 'sent' : 'received'"
      [text]="message.content"
      [date]="message.createdAt"
    ></chat-message>
  </div>`,
  styles: [],
})
export class ChatMessagesComponent {
  @Input() messages!: Message[];
  @Input() user!: User | null;
}
