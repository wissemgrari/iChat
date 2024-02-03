import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'float-button',
  template: `
    <button
      (click)="onClick()"
      class="absolute bottom-5 right-0 w-14 h-14 group bg-lightDark flex items-center justify-center rounded-full z-50"
    >
      <img class="w-7 group-hover:scale-90 transition-all duration-200" src="/assets/bubble.svg" alt="bubble" />
    </button>
  `,
})
export class FloatButtonComponent {
  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  }
}
