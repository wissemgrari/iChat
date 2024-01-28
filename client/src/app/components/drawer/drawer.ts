import { Component } from '@angular/core';

@Component({
  selector: 'drawer',
  template: `
    <div
      class="bg-lightDark/50 backdrop-blur-sm w-[24rem] h-72 flex items-center justify-center p-5 rounded-xl rounded-b-none border border-b-0 z-[999] border-grey/40 select-none"
    >
      <div class="absolute top-3 cursor-grab p-3 -mt-[10px]" id="drawer-handler">
        <span class="block w-24 h-[6px] bg-grey/40 rounded-full"></span>
      </div>

      <h1 class="text-white">drawer</h1>
    </div>
  `,
})
export class Drawer {}
