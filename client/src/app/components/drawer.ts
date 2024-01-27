import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'drawer',
  template: `
    <div
      id="drawer"
      class="relative bg-lightDark/50 backdrop-blur-sm w-[24rem] h-72 flex items-center justify-center p-5 rounded-xl rounded-b-none border border-b-0 z-[999] border-grey/40"
    >
      <div
        class="w-24 h-[6px] bg-grey/40 rounded-full absolute top-3 cursor-grab"
      ></div>
      <h1 class="text-white">drawer</h1>
    </div>
  `,
})
export class Drawer {
  private isDrawerOpen: boolean = false;
  private mainWrapper!: HTMLDivElement | null;
  private drawer!: HTMLDivElement | null;

  constructor() {
    this.mainWrapper = document.querySelector('#main');
    this.drawer = document.querySelector('drawer');
  }

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
    this.mainWrapper?.classList.toggle('overlay');
    this.drawer?.classList.toggle('drawer-visible');
  }

}
