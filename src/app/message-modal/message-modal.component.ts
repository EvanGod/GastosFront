import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss'],
})
export class MessageModalComponent {

  @Input() message: string = '';
  @Input() header: string = 'Mensaje';

  constructor(private modalController: ModalController) {}

  // Función para cerrar la modal
  dismiss() {
    this.modalController.dismiss();
  }
}
