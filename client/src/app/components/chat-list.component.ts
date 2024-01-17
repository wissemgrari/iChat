import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from 'types/global-types';

@Component({
  selector: 'chat-list',
  template: `
    <div class="max-h-[55vh] overflow-y-auto" *ngFor="let user of users">
      <chat-item [user]="user"></chat-item>
    </div>
  `,
})
export class ChatListComponent {
  users: User[] = [];
  constructor(private userService: UserService) {}
}
