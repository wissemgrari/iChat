import { Component } from '@angular/core';

@Component({
  selector: 'chat-item',
  template: `
    <div
      class="flex items-center gap-3 py-5 px-2 rounded-lg cursor-pointer hover:bg-lightDark select-none transition duration-300"
    >
      <img src="/assets/user.jpg" alt="user" class="w-28 rounded-xl" />
      <div class="flex flex-col gap-1">
        <p>Ken Adams</p>
        <span class="text-sm text-light whitespace-nowrap text-ellipsis"
          >Messages is a simple, helpful messaging app that keeps you connected
          with the people who matter most.</span
        >
      </div>
    </div>
  `,
})
export class ChatItemComponent {}
