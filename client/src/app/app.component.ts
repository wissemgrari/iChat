import { Component, ElementRef, ViewChild } from '@angular/core';
import { Drawer } from './components/drawer/drawer';
import { DrawerService } from './components/drawer/drawer.service';

@Component({
  selector: 'app-root',
  template: `
    <main class="bg-dark">
      <div #main class="relative h-[100dvh] w-full max-w-sm mx-auto px-3 transition-all duration-200">
        <router-outlet></router-outlet>
      </div>
      <drawer class="drawer" #drawer></drawer>
    </main>
  `,
})
export class AppComponent {
  @ViewChild('drawer') drawer!: Drawer;
  @ViewChild('drawer', { read: ElementRef }) drawerElement!: ElementRef;
  @ViewChild('main', { read: ElementRef }) mainElement!: ElementRef;

  constructor(private drawerService: DrawerService) {}

  ngAfterViewInit() {
    this.drawerService.setDrawer(this.drawer, this.drawerElement, this.mainElement);
  }
}
