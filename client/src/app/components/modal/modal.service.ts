import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalElement!: ElementRef;
  mainElement!: ElementRef;

  setModal(modalElement: ElementRef, mainElement: ElementRef) {
    this.modalElement = modalElement;
    this.mainElement = mainElement;
  }

  showModal() {
    this.mainElement.nativeElement.classList.add('overlay');
    this.mainElement.nativeElement.classList.add('scale-[95%]');
    this.modalElement.nativeElement.classList.toggle('modal-visible');
  }

  hideModal() {
    this.mainElement.nativeElement.classList.remove('overlay');
    this.mainElement.nativeElement.classList.remove('scale-[95%]');
    this.modalElement.nativeElement.classList.remove('modal-visible');
  }
  
}
