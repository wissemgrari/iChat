import { Component } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
    <div class="flex flex-col items-center gap-1">
      <img
        class="w-12 rounded-full border-2 border-light"
        src="/assets/user.jpg"
        alt="avatar"
      />
    </div>
  `,
})
export class AvatarComponent {}
