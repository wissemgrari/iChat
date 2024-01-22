import { Component, Input } from '@angular/core';

@Component({
  selector: 'chat-message',
  template: `
    <div>
      <div
        class="p-3 min-w-[70px] max-w-[220px] w-max rounded-lg text-sm"
        [ngClass]="{
          sent: type === 'sent',
          received: type === 'received'
        }"
      >
        <p>{{ text }}</p>
      </div>
      <span
        class="flex text-[10px] text-light/80 p-1"
        [ngStyle]="{
          'justify-content': type === 'sent' ? 'flex-start' : 'flex-end'
        }"
        >{{ formatDate(date) }}</span
      >
    </div>
  `,
  styles: [
    `
      .sent {
        @apply bg-blue text-white;
      }
      .received {
        @apply bg-lightDark text-white ml-auto;
      }
    `,
  ],
})
export class ChatMessageComponent {
  @Input() type: 'sent' | 'received' = 'sent';
  @Input() text!: string;
  @Input() date!: Date;

  formatDate(timestamp: Date) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }


}
