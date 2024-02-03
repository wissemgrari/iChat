import { Component } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'modal',
  template: `
    <div>
      <img
        (click)="hideModal()"
        src="/assets/close.svg"
        class="w-7 h-7 select-none rounded-full p-1 cursor-pointer hover:bg-grey/20 ml-auto opacity-60"
      />
      <div
        class="flex gap-x-2 mt-5 border border-grey px-4 py-2 rounded-full items-center"
      >
        <img src="/assets/search.svg" alt="" class="w-5 opacity-60" />
        <input
          type="search"
          placeholder="find contact"
          class="w-full p-1 bg-transparent outline-none placeholder:text-sm placeholder:text-white/60 text-white"
        />
      </div>
    </div>
  `,
})
export class ModalComponent {
  constructor(private modalService: ModalService) {}

  hideModal() {
    this.modalService.hideModal();
  }
}
