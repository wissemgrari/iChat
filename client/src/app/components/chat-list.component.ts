import { Component } from '@angular/core';

@Component({
  selector: 'chat-list',
  template: `
    <div class="max-h-[55vh] overflow-y-auto">
      <chat-item></chat-item>
      <chat-item></chat-item>
      <chat-item></chat-item>
    </div>
  `,
})
export class ChatListComponent {}
