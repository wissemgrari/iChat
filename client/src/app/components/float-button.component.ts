import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'float-button',
  template: `
    <button
      (click)="onClick()"
      class="absolute bottom-5 right-0 w-14 h-14 bg-lightDark flex items-center justify-center rounded-full"
    >
      <img class="w-7" src="/assets/bubble.svg" alt="bubble" />
    </button>
  `,
})
export class FloatButtonComponent {
  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  }
}
