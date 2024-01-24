import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from './chat.service';
import { Message, User } from 'types/global-types';
import { StompService } from 'src/app/ws/stomp.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit, AfterViewChecked {
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
    private authService: AuthService,
    private stomp: StompService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? '';
    });
  }

  @ViewChild('chatListContainer', { read: ElementRef })
  chatListContainer!: ElementRef<any>;

  ngAfterViewChecked() {
    this.scrollBottom();
  }

  scrollBottom() {
    this.chatListContainer.nativeElement.scrollTop =
      this.chatListContainer.nativeElement.scrollHeight;
  }

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages() {
    this.chatService.getChatMessages(this.id).subscribe({
      next: ({ user, participant, messages }) => {
        this.user = user;
        this.participant = participant;
        this.messages = messages;
        this.stomp.subscribe(
          `/user/${this.user?.id}/queue/messages`,
          (payload: any) => this.onMessageReceived(payload)
        );
        this.stomp.subscribe(
          `/user/${this.user?.id}/sent/messages`,
          (payload: any) => this.onMessageSent(payload)
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  sendMessage(message: string) {
    this.chatService.sendMessage({
      message: {
        content: message,
        senderID: this.authService.getUser()?.id ?? 0,
        recipientID: this.participant?.id ?? 0,
      },
      chatID: this.id,
    });
    this.scrollBottom()
  }

  onMessageReceived(payload: any) {
    const data: Message = JSON.parse(payload.body);
    this.messages.push(data);
  }

  onMessageSent(payload: any) {
    const data: Message = JSON.parse(payload.body);
    this.messages.push(data);
  }
}
