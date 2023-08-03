import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      (click)="onClick()"
      class="w-full bg-{{ color ? 'blue' : 'white' }} text-{{
        color ? 'white' : 'dark'
      }} font-medium px-5 py-3 rounded flex items-center justify-center gap-2"
    >
      <img class="w-6" src="{{ icon }}" alt="btn-icon" *ngIf="icon" />
      <span class="capitalize">{{ text }}</span>
    </button>
  `,
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() icon!: string;
  @Input() color!: string;
  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  }
}
