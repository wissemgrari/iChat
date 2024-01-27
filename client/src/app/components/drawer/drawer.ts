import { Component } from '@angular/core';

@Component({
  selector: 'drawer',
  template: `
    <div
      class="bg-lightDark/50 backdrop-blur-sm w-[24rem] h-72 flex items-center justify-center p-5 rounded-xl rounded-b-none border border-b-0 z-[99] border-grey/40 select-none"
    >
      <div
        id="drawer-handler"
        class="w-24 h-[6px] bg-grey/40 rounded-full absolute top-3 cursor-grab"
      ></div>
      <h1 class="text-white">drawer</h1>
    </div>
  `,
})
export class Drawer {}
