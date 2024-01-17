import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'types/global-types';

@Component({
  selector: 'chat-header',
  template: `
    <div
      class="bg-lightDark w-full py-3 flex flex-col gap-y-2 items-center justify-center"
    >
      <img
        [src]=""
        alt="user"
        class="w-14 rounded-full border-2 border-light"
      />
      <span class="text-white text-lg font-medium"
        >{{ user.firstName }} {{ user.lastName }}</span
      >

      <div
        (click)="goBack()"
        class="absolute left-3 w-8 p-2 rounded-full hover:bg-grey/30 transition duration-300 flex justify-center items-center cursor-pointer"
      >
        <img
          class="rotate-180 relative -left-0.5"
          src="/assets/chevron.svg"
          alt="chevron-icon"
        />
      </div>
    </div>
  `,
})
export class ChatHeaderComponent {
  @Input() user!: User;

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
