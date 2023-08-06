import { Component } from '@angular/core';

@Component({
  selector: 'chat-header',
  template: `
    <div
      class="bg-lightDark w-full py-3 flex flex-col gap-y-2 items-center justify-center"
    >
      <img
        src="/assets/user.jpg"
        alt="user"
        class="w-14 rounded-full border-2 border-light"
      />
      <span class="text-white text-lg font-medium">John Doe</span>

      <div
        class="absolute left-3 w-8 p-2 rounded-full hover:bg-grey/30 flex justify-center items-center cursor-pointer"
      >
        <img class="rotate-180" src="/assets/chevron.svg" alt="chevron-icon" />
      </div>
    </div>
  `,
})
export class ChatHeaderComponent {}
