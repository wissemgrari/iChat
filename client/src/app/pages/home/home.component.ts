import { Component, OnInit} from '@angular/core';
import { HomeService } from './home.service';
import { StorageService } from 'src/app/auth/storage.service';
import { Chat, User } from 'types/global-types';

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
}
