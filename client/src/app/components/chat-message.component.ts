import { Component, Input } from '@angular/core';

@Component({
  selector: 'chat-message',
  template: `
    <div
      class="p-3 max-w-[220px] w-max rounded-lg text-sm"
      [ngClass]="{
        sent: type === 'sent',
        received: type === 'received'
      }"
    >
      <p>{{ text }}</p>
    </div>
  `,
  styles: [
    `
      .sent {
        @apply bg-blue text-white ml-auto;
      }
      .received {
        @apply bg-lightDark text-white;
      }
    `,
  ],
})
export class ChatMessageComponent {
  @Input() type: 'sent' | 'received' = 'sent';
  @Input() text!: string;
}
