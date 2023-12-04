import { Component } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
    <div class="flex flex-col items-center gap-1">
      <img
        class="w-12 rounded-full border-2 border-light"
        src="https://xsgames.co/randomusers/assets/avatars/male/18.jpg"
        alt="avatar"
      />
    </div>
  `,
})
export class AvatarComponent {}
