import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
          class="bg-transparent flex-1 outline-none px-5 py-3 border border-grey rounded-full placeholder:text-sm resize-none focus-within:border-light transition-all duration-300"
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
  @Output() sendMessage = new EventEmitter<string>()

  constructor() {}

  messageForm = new FormGroup({
    message: new FormControl(''),
  });

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.messageForm.invalid) return;
    this.sendMessage.emit(this.messageForm.value.message as string)
    this.messageForm.value.message = '';
  }
}
