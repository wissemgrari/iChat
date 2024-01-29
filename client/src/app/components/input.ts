import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `
    <div
      class="relative w-full rounded-md border-2 border-transparent focus-within:border-grey transition-all duration-200"
    >
      <input
        type="{{ type }}"
        [(ngModel)]="value"
        (input)="onInput($event)"
        #input
        class="block px-6 pt-6 pb-1 w-full text-white text-base bg-lightDark appearance-none focus:outline-none focus:ring-0 peer"
        placeholder=" "
      />
      <label
        (click)="focus()"
        class="absolute text-sm capitalize text-light duration-300 transform -translate-y-3 scale-75 top-4 z-50 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3  cursor-text"
      >
        {{ label }}
      </label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    },
  ],
})
export class InputComponent implements ControlValueAccessor {

  @Input() type: string = 'text';
  @Input() label!: string;
  value: string = '';

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  // ControlValueAccessor methods
  private onChange: (_: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
  }

  focus() {
    this.input.nativeElement.focus();
  }
}
