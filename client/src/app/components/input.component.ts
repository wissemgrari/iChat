import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `
    <div
      class="relative w-full rounded-md border-2 border-transparent focus-within:border-grey transition-all duration-300"
    >
      <input
        type="{{ type }}"
        value="{{ value }}"
        #input
        class="block px-6 pt-6 pb-1 w-full text-white text-lg bg-lightDark appearance-none focus:outline-none focus:ring-0 peer"
        placeholder=" "
      />
      <label
        (click)="focus()"
        class="absolute text-base capitalize text-light duration-300 transform -translate-y-3 scale-75 top-4 z-50 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 select-none"
      >
        {{ label }}
      </label>
    </div>
  `,
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() value!: string;
  @Input() label!: string;

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  focus() {
    this.input.nativeElement.focus();
  }
}
