import { Component, AfterViewInit } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements AfterViewInit{

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('myModal');
    if (modalElement) {
      const myModal = new Modal(modalElement);
      myModal.show(); // Abre el modal automáticamente
    }
  }

}
