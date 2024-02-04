import { Component, Input } from '@angular/core';
import { User } from 'types/global-types';

@Component({
  selector: 'contact',
  template: `
    <div
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
}
