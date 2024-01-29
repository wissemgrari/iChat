import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'types/global-types';
import { DrawerService } from './drawer.service';

@Component({
  selector: 'drawer',
  template: `
    <div
      class="relative bg-lightDark/40 backdrop-blur-sm w-[24rem] flex flex-col gap-y-3 h-auto rounded-xl rounded-b-none border border-b-0 z-[999] border-grey/20"
    >
      <div
        class="flex items-center justify-center cursor-grab p-3 border-b border-grey/10"
        id="drawer-handler"
      >
        <span class="block w-24 h-[6px] bg-grey/40 rounded-full"></span>
      </div>
      <div class="flex-1 text-white divide-y divide-grey/20">
        <div class="flex items-center px-5 pt-2 pb-10 gap-x-3">
          <avatar [style]="'square'" [size]="'lg'" [user]="user" />
          <div class="flex flex-col gap-y-1">
            <div class="flex gap-x-1">
              <p>{{ user?.firstName }}</p>
              <p>{{ user?.lastName }}</p>
            </div>
            <p class="text-xs text-light/70">{{ user?.email }}</p>
            <p
              class="text-xs text-light/50 flex items-center gap-x-1 animate-pulse"
            >
              <span class="block w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>online</span>
            </p>
          </div>
        </div>
        <div
          class="bg-lightDark/50 flex justify-between items-center divide-x divide-grey/20 cursor-pointer uppercase"
        >
          <div
            id="close-btn"
            class="py-3 w-full text-center group transition-all duration-200 hover:bg-lightDark"
          >
            <span
              class="text-red-700 font-medium group-hover:text-red-600 group-hover:text-sm transition-all duration-200"
              >Close</span
            >
          </div>
          <div
            id="logout-btn"
            (click)="handleLogout()"
            class="py-3 w-full text-center group transition-all duration-200 hover:bg-lightDark"
          >
            <span
              class="text-red-700 font-medium group-hover:text-red-600 group-hover:text-sm transition-all duration-200"
              >Logout</span
            >
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Drawer {
  user!: User | null;

  constructor(private authService: AuthService, private router: Router, private drawer: DrawerService) {
    this.user = authService.getUser();
  }

  handleLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.drawer.hideDrawer();
        this.router.navigate(['/login']);
      },
      error: (error) => console.log(error),
    });
  }
}
