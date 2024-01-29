import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
};

@Component({
  selector: 'app-input',
  host: { '(blur)': 'onTouched($event)' },
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  template: `
    <div
      class="relative w-full rounded-md border-2 border-transparent focus-within:border-grey transition-all duration-200"
    >
      <input
        type="{{ type }}"
        [(ngModel)]="value"
        (input)="onInput($event)"
        (blur)="onTouched($event)"
        #input
        class="block px-6 pt-6 pb-1 w-full text-white text-base bg-lightDark appearance-none focus:outline-none focus:ring-0 peer"
        placeholder=" "
        required
      />
      <label
        (click)="focus()"
        class="absolute text-sm capitalize text-light duration-300 transform -translate-y-3 scale-75 top-4 z-50 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3  cursor-text"
      >
        {{ label }}
      </label>
    </div>
  `,
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() label!: string;
  private _value: any = '';

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  public onChange: any = (_: any) => {};
  public onTouched: any = () => {};

  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  onInput(event: Event): void {
    this._value = (event.target as HTMLInputElement).value;
    this.onChange(this._value);
  }

  writeValue(value: any) {
    this._value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  focus() {
    this.input.nativeElement.focus();
  }
}
