import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'types/global-types';
import { ChatService } from '../pages/chat/chat.service';
import { ModalService } from './modal/modal.service';

@Component({
  selector: 'contact',
  template: `
    <div
      (click)="createChat()"
      class="flex items-center gap-3 py-3 px-2 rounded-lg cursor-pointer hover:bg-grey/10 transition-all duration-200"
    >
      <avatar [user]="user" [style]="'square'" />
      <div class="flex flex-col gap-1 text-white">
        <p class="capitalize text-sm">
          {{ user.firstName }} {{ user.lastName }}
        </p>
        <p class="text-xs text-white/70">{{ user.email }}</p>
      </div>
    </div>
  `,
})
export class ContactComponent {
  @Input() user!: User;
  constructor(
    private chatService: ChatService,
    private router: Router,
    private modal: ModalService
  ) {}

  createChat(): void {
    this.chatService.createChat(this.user.id).subscribe({
      next: (response) => {
        this.modal.hideModal();
        if (response.message) {
          this.router.navigate([`/chat/${response.chat.id}`]);
          return;
        }
        this.router.navigate([`/chat/${response.id}`]);
      },
      error: (error) => console.log(error),
    });
  }
}
