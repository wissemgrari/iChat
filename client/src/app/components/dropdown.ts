import { Component } from '@angular/core';

@Component({
  selector: 'dropdown',
  template: `
    <div
      class="w-40 rounded-md bg-lightDark text-white"
    >
      <div class="divide-y divide-grey/20">
        <div class="pr-4 pl-3 py-3 text-sm flex items-center gap-x-2 cursor-pointer">
          <span class="block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span>Elon Musk</span>
        </div>
        <div>
          <span class="block text-sm px-4 py-2 cursor-pointer hover:bg-grey/20">Settings</span>
          <span class="block text-sm px-4 py-2 cursor-pointer hover:bg-grey/20">Logout</span>
        </div>
      </div>
    </div>
  `,
})
export class DropDownComponent {}
