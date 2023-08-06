import { Component } from '@angular/core';

@Component({
  selector: 'chat-input',
  template: `
    <div class="text-white p-3 bg-lightDark">
      <div class="flex items-center gap-3">
        <img
          class="w-6 opacity-70 cursor-pointer hover:opacity-100"
          src="/assets/camera.svg"
          alt="camera-ico"
        />
        <input
          type="text"
          class="bg-transparent flex-1 outline-none px-5 py-3 border border-grey rounded-full placeholder:text-sm focus-within:border-light transition-all duration-300"
          placeholder="Type message"
        />
        <button class="cursor-pointer opacity-70 hover:opacity-100">
          <img class="w-6" src="/assets/send.svg" alt="send-ico" />
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class ChatInputComponent {}
