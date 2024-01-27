import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'types/global-types';

@Component({
  selector: 'avatar',
  template: `
      <div (click)="click()" class="flex flex-col items-center gap-1 cursor-pointer hover:brightness-75 hover:scale-90 transition-all duration-300">
        <img
          *ngIf="user?.imageURL"
          class="w-12 h-12 rounded-full border-2"
          [src]="user?.imageURL"
          alt="avatar"
        />
        <div
          class="w-12 h-12 flex justify-center items-center"
          [style.backgroundColor]="avatarBG"
          [style.borderRadius]="style == 'circle' ? '50%' : '1rem'"
          [style.border]="style == 'circle' ? '2px solid #ccc' : 'none'"
        >
          <span class="uppercase text-sm font-medium text-white">
            {{ getInitials() }}
          </span>
        </div>
      </div>
  `,
})
export class AvatarComponent {
  avatarBG: string = '';

  @Input() user!: User | null;
  @Input() style: 'circle' | 'square' = 'circle';

  @Output() onClick = new EventEmitter();

  click() {
    this.onClick.emit();
  }

  getInitials(): string {
    if (this.user && this.user.firstName && this.user.lastName) {
      return this.user.firstName.charAt(0) + this.user.lastName.charAt(0);
    } else {
      return '';
    }
  }

  colors = [
    '#2196F3',
    '#32c787',
    '#00BCD4',
    '#ff5652',
    '#e13849',
    '#ffc107',
    '#ff85af',
    '#FF9800',
    '#39bbb0',
    '#03396c',
    '#3f67fa',
    '#fbcb6d',
    '#667895',
    '#0e1d2c',
    '#7a3131',
    '#ee4343',
    '#b4924c',
  ];

  getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }

  ngOnInit() {
    this.avatarBG = this.getRandomColor();
  }
}
