import { Component, Input } from '@angular/core';
import { Chat, User } from 'types/global-types';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'chat-item',
  template: `
    <div
      routerLink="/chat/{{ chat.id }}"
      class="flex items-center gap-3 py-5 px-2 rounded-lg cursor-pointer hover:bg-lightDark select-none transition duration-300"
    >
      <avatar [user]="getParticipant()" [style]="'square'" />
      <div class="flex flex-col gap-1">
        <p class="capitalize">{{ getParticipant().firstName }} {{ getParticipant().lastName }}</p>
        <span class="text-sm text-light whitespace-nowrap text-ellipsis">{{chat.msgPreview.content}}</span
        >
      </div>
    </div>
  `,
})
export class ChatItemComponent {
  @Input() chat!: Chat;

  constructor(private authService: AuthService) {
  }

  getParticipant = (): User =>  {
    const loggedInUser = this.authService.getUser();
    const participant = this.chat.user1.id === loggedInUser?.id ? this.chat.user2 : this.chat.user1;
    return participant;
  }

}
