import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'Button',
  template: `
    <button
    type="{{ type }}"
      [ngClass]="{
        primary: variant === 'primary',
        secondary: variant === 'secondary'
      }"
      (click)="click()"
      class="primary w-full font-semibold px-5 py-3 rounded flex items-center justify-center gap-2 hover:opacity-80 hover:scale-[95%] transition duration-300 select-none"
    >
      <img class="w-6" src="{{ icon }}" alt="btn-icon" *ngIf="icon" />
      <span class="capitalize">{{ text }}</span>
    </button>
  `,
  styles: [
    `
      .primary {
        @apply bg-white text-dark;
      }
      .secondary {
        @apply bg-blue text-white;
      }
    `,
  ],
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() type: string = "button";
  @Input() icon!: string;
  @Input() variant: string = 'primary';
  @Output() onClick = new EventEmitter();

  click() {
    this.onClick.emit();
  }
}
