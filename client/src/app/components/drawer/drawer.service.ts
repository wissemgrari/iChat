import { ElementRef, Injectable } from '@angular/core';
import { Drawer } from './drawer';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  isDrawerOpen: boolean = false;
  drawerElement!: ElementRef;
  private drawer!: Drawer;
  private mainElement!: ElementRef;

  setDrawer(
    drawer: Drawer,
    drawerElement: ElementRef,
    mainElement: ElementRef
  ) {
    this.drawer = drawer;
    this.drawerElement = drawerElement;
    this.mainElement = mainElement;
  }

  showDrawer() {
    this.isDrawerOpen = true;
    this.drawerElement.nativeElement.classList.add('drawer-visible');
    this.mainElement.nativeElement.classList.add('overlay');
    this.mainElement.nativeElement.classList.add('scale-[95%]');

    // Add event listener to close drawer when clicking outside
    document.body.addEventListener('click', this.handleClickOutside);
  }

  hideDrawer() {
    this.isDrawerOpen = false;
    this.drawerElement.nativeElement.classList.remove('drawer-visible');
    this.mainElement.nativeElement.classList.remove('overlay');
    this.mainElement.nativeElement.classList.remove('scale-[95%]');

    // Remove event listener when drawer is closed
    document.body.removeEventListener('click', this.handleClickOutside);
  }

  private handleClickOutside = (event: MouseEvent) => {
    if (
      !this.drawerElement.nativeElement.contains(event.target) &&
      this.drawerElement.nativeElement.classList.contains('drawer-visible')
    ) {
      this.hideDrawer();
    }
  };

}
