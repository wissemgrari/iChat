import { ElementRef, Injectable } from '@angular/core';
import { Drawer } from './drawer';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  isDrawerOpen = false;
  isDragging = false;
  drawerElement!: ElementRef;
  private drawer!: Drawer;
  private mainElement!: ElementRef;
  private threshold = 150;
  private dragStartY = 0;
  private animationFrameId = 0;

  constructor() {}

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
    if (!this.drawerElement || !this.mainElement) return;

    this.isDrawerOpen = true;
    this.drawerElement.nativeElement.classList.add('drawer-visible');
    this.mainElement.nativeElement.classList.add('overlay');
    this.mainElement.nativeElement.classList.add('scale-[95%]');

    document.body.addEventListener('click', this.handleClickOutside);

    document
      .getElementById('drawer-handler')
      ?.addEventListener('mousedown', this.mouseDown);
    this.drawerElement.nativeElement.addEventListener('mouseup', this.mouseUp);
    this.drawerElement.nativeElement.addEventListener(
      'mousemove',
      this.mouseMove
    );
    document.addEventListener('mousemove', this.globalMouseMove);
  }

  hideDrawer() {
    if (!this.drawerElement || !this.mainElement) return;

    this.isDrawerOpen = false;
    this.isDragging = false;
    this.mainElement.nativeElement.classList.remove('overlay');
    this.mainElement.nativeElement.classList.remove('scale-[95%]');
    this.drawerElement.nativeElement.classList.remove('drawer-visible');

    document.body.removeEventListener('click', this.handleClickOutside);

    document
      .getElementById('drawer-handler')
      ?.removeEventListener('mousedown', this.mouseDown);
    this.drawerElement.nativeElement.removeEventListener(
      'mouseup',
      this.mouseUp
    );
    this.drawerElement.nativeElement.removeEventListener(
      'mousemove',
      this.mouseMove
    );
    document.removeEventListener('mousemove', this.globalMouseMove);
  }

  private handleClickOutside = (event: MouseEvent) => {
    if (
      !this.drawerElement?.nativeElement.contains(event.target) &&
      this.drawerElement?.nativeElement.classList.contains('drawer-visible') &&
      !this.isDragging
    ) {
      this.hideDrawer();
    }
  };

  private mouseDown = (event: MouseEvent) => {
    this.isDragging = true;
    this.dragStartY = event.clientY;
  };

  private mouseUp = (event: MouseEvent) => {
    this.isDragging = false;
  };

  private mouseMove = (event: MouseEvent) => {
    if (!this.drawerElement) return;

    let mouseY = event.clientY;
    const deltaY = mouseY - this.dragStartY;

    if (this.isDragging) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = requestAnimationFrame(() => {
        this.drawerElement.nativeElement.style.top = `${mouseY}px`;
        if (deltaY > this.threshold) {
          this.hideDrawer();
          this.drawerElement.nativeElement.removeAttribute('style');
        }
      });
    } else {
      this.drawerElement.nativeElement.removeAttribute('style');
    }
  };

  private globalMouseMove = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (this.isDragging && !target.closest('#drawer-handler')) {
      if (this.isDrawerOpen) {
        cancelAnimationFrame(this.animationFrameId);
        this.hideDrawer();
        this.drawerElement.nativeElement.removeAttribute('style');
      }
    }
  };
}
