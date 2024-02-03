import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/auth/storage.service';
import { DrawerService } from 'src/app/components/drawer/drawer.service';
import { ModalService } from 'src/app/components/modal/modal.service';
import { Chat, User } from 'types/global-types';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private chats!: Chat[] | null;
  private user: User | null;

  getChats(): Chat[] {
    return this.chats ?? [];
  }

  getUser(): User | null {
    return this.user;
  }

  constructor(
    private homeService: HomeService,
    private storageService: StorageService,
    private drawerService: DrawerService,
    private modalService: ModalService
  ) {
    this.user = storageService.getUser();
  }

  ngOnInit() {
    this.fetchChats();
    this.chats = this.storageService.getChats();
  }

  fetchChats() {
    this.homeService.fetchChats().subscribe({
      next: ({ chats }) => {
        this.chats = chats;
        this.storageService.setChats(chats);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showDrawer() {
    this.drawerService.showDrawer();
  }

  showModal() {
    this.modalService.showModal();
  }
}
