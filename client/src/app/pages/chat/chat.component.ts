import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from './chat.service';
import { Message, User } from 'types/global-types';
import { StompService } from 'src/app/ws/stomp.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  private id!: string;

  private user!: User | null;
  private participant!: User | null;
  private messages!: Message[];

  getUser(): User | null {
    return this.user;
  }

  getParticipant(): User | null {
    return this.participant;
  }

  getMessages(): Message[] {
    return this.messages;
  }

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private stomp: StompService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? '';
    });
  }

  ngOnInit(): void {
    this.fetchMessages();

    this.stomp.subscribe(`/user/queue/messages`, (payload: any): void => {
      console.log("message received", payload)
    });

  }

  fetchMessages() {
    this.chatService.getChatMessages(this.id).subscribe({
      next: ({ user, participant, messages }) => {
        this.user = user;
        this.participant = participant;
        this.messages = messages;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
