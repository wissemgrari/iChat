import { Component } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'modal',
  template: `
    <div class="flex items-center justify-between">
      <p class="text-white text-base uppercase">Contacts</p>
      <img
        (click)="hideModal()"
        src="/assets/close.svg"
        class="w-7 h-7 select-none rounded-full p-1 cursor-pointer hover:bg-grey/20"
      />
    </div>

    <div
      class="flex gap-x-2 mt-5 px-4 py-2 rounded-full items-center border-2 border-grey/20 focus-within:border-grey/50 transition-all duration-300"
    >
      <img src="/assets/search.svg" alt="" class="w-5 opacity-60" />
      <input
        type="search"
        placeholder="Search"
        class="w-full p-1 bg-transparent outline-none text-sm placeholder:text-sm placeholder:text-white/60 text-white"
      />
    </div>

    <div class="mt-5 max-h-72 overflow-y-auto">
      <contact></contact>
      <contact></contact>
      <contact></contact>
      <contact></contact>
      <contact></contact>
      <contact></contact>
      <contact></contact>
    </div>
  `,
})
export class ModalComponent {
  constructor(private modalService: ModalService) {}

  hideModal() {
    this.modalService.hideModal();
  }
}
