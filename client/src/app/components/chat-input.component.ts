import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from '../pages/chat/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'chat-input',
  template: `
    <form [formGroup]="messageForm" (submit)="onSubmit($event)">
      <div class="text-white p-3 bg-lightDark flex items-center gap-3">
        <img
          class="w-6 opacity-70 cursor-pointer hover:opacity-100"
          src="/assets/camera.svg"
          alt="camera-ico"
        />
        <textarea
          formControlName="message"
          rows="1"
          class="bg-transparent flex-1 outline-none px-5 py-3 border border-grey rounded-full placeholder:text-sm focus-within:border-light transition-all duration-300"
          placeholder="Type message"
        ></textarea>
        <button
          type="submit"
          class="cursor-pointer opacity-70 hover:opacity-100"
        >
          <img class="w-6" src="/assets/send.svg" alt="send-ico" />
        </button>
      </div>
    </form>
  `,
  styles: [],
})
export class ChatInputComponent {
  private id!: string;

  constructor(private chatService: ChatService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? '';
    });
  }

  messageForm = new FormGroup({
    message: new FormControl(''),
  });

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.messageForm.invalid) return;
    this.chatService
      .sendMessage({
        message: this.messageForm.value.message as string,
        chatID: this.id,
      })
      .subscribe({
        next: (response) => this.messageForm.setValue({message: ''}),
        error: (error) => console.log(error),
      });
  }
}
