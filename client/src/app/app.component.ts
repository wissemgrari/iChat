import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Drawer } from './components/drawer/drawer';
import { DrawerService } from './components/drawer/drawer.service';
import { ModalService } from './components/modal/modal.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <main class="bg-dark">
      <div
        #main
        class="relative h-[100dvh] w-full max-w-sm mx-auto px-3 transition-all duration-200"
      >
        <router-outlet></router-outlet>
      </div>
      <modal class="modal" #modal></modal>
      <drawer class="drawer" #drawer></drawer>
    </main>
  `,
})
export class AppComponent implements OnInit{
  @ViewChild('drawer') drawer!: Drawer;
  @ViewChild('drawer', { read: ElementRef }) drawerElement!: ElementRef;
  @ViewChild('main', { read: ElementRef }) mainElement!: ElementRef;
  @ViewChild('modal', { read: ElementRef }) modalElement!: ElementRef;

  constructor(
    private drawerService: DrawerService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (params["code"] !== undefined) {
          this.authService.getToken(params["code"]).subscribe(result => {
            if (result === true) {
              console.log("Logged in successfully")
            } else {
              console.log("Failed to log in")
            }
          });
        }
      }
    );
  }

  ngAfterViewInit() {
    this.drawerService.setDrawer(
      this.drawer,
      this.drawerElement,
      this.mainElement
    );
    this.modalService.setModal(this.modalElement, this.mainElement);
  }
}
