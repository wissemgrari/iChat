import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { UserService } from 'src/app/user/user.service';
import { User } from 'types/global-types';

@Component({
  selector: 'modal',
  template: `
    <div class="bg-lightDark w-[24rem] p-5 rounded-lg z-[999] shadow-lg">
      <div class="flex items-center justify-between">
        <p class="text-white text-base uppercase">Contacts</p>
        <img
          (click)="hideModal()"
          src="/assets/close.svg"
          class="w-7 h-7 select-none rounded-full p-1 cursor-pointer hover:bg-grey/20"
        />
      </div>

      <div
        class="flex gap-x-2 mt-5 px-4 py-2 rounded-full items-center border-2 border-grey/20 focus-within:border-grey/50 transition-all duration-300"
      >
        <img src="/assets/search.svg" alt="" class="w-5 opacity-60" />
        <input
          type="search"
          placeholder="Search"
          class="w-full p-1 bg-transparent outline-none text-sm placeholder:text-sm placeholder:text-white/60 text-white"
        />
      </div>

      <div class="mt-5 max-h-72 overflow-y-auto" *ngIf="users.length > 0">
        <div *ngFor="let user of users">
          <contact [user]="user"></contact>
        </div>
      </div>

      <div *ngIf="users.length === 0">
        <h1 class="text-white text-center py-1 animate-pulse">Loading...</h1>
      </div>
    </div>
  `,
})
export class ModalComponent implements OnInit {
  users: User[] = [];

  constructor(
    private modalService: ModalService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: ({ users }) => (this.users = users),
      error: (error) => console.log(error),
    });
  }

  hideModal() {
    this.modalService.hideModal();
  }
}
