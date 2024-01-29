import { Component, Input } from '@angular/core';
import { Chat, User } from 'types/global-types';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'chat-item',
  template: `
    <div
      routerLink="/chat/{{ chat?.id }}"
      class="flex items-center gap-3 py-5 px-2 rounded-lg cursor-pointer hover:bg-lightDark  transition duration-300"
    >
      <avatar [user]="getParticipant()" [style]="'square'" />
      <div class="flex flex-col gap-1">
        <p class="capitalize">
          {{ getParticipant()?.firstName }} {{ getParticipant()?.lastName }}
        </p>
        <span class="text-sm text-light whitespace-nowrap text-ellipsis" [style.color]="chat?.msgPreview == null ? 'red' : null">{{
          chat?.msgPreview?.content != null
            ? chat?.msgPreview?.content
            : "No messages in the chat"
        }}</span>
      </div>
    </div>
  `,
})
export class ChatItemComponent {
  @Input() chat!: Chat | null;

  constructor(private authService: AuthService) {}

  getParticipant = (): User | null => {
    const loggedInUser = this.authService.getUser();
    const participant =
      this?.chat?.user1?.id === loggedInUser?.id
        ? this?.chat?.user2
        : this?.chat?.user1;
    return participant ?? null;
  };
}
