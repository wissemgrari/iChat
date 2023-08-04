import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `
    <div class="relative w-full">
      <input
        type="{{ type }}"
        value="{{ value }}"
        id="{{ id }}"
        name="{{ name }}"
        class="block rounded-md px-6 pt-6 pb-1 w-full text-white text-lg bg-lightDark appearance-none focus:outline-none focus:ring-0 peer"
        placeholder=" "
      />
      <label
        for="{{ id }}"
        class="absolute text-base capitalize text-light duration-200 transform -translate-y-3 scale-75 top-4 z-50 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {{ label }}
      </label>
    </div>
  `,
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() value!: string;
  @Input() name!: string;
  @Input() id!: string;
  @Input() label!: string;
}
