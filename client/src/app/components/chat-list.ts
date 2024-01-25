import { Component, Input } from '@angular/core';
import { Chat } from 'types/global-types';

@Component({
  selector: 'chat-list',
  template: `
    <div class="max-h-[55vh] overflow-y-auto" *ngFor="let chat of chats">
      <chat-item [chat]="chat"></chat-item>
    </div>
  `,
})
export class ChatListComponent {
  constructor() {}

  @Input() chats!: Chat[] | null;
  
}
