import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MessageModalComponent } from './message-modal/message-modal.component'; // Asegúrate de crear este componente

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalController: ModalController) {}

  // Función para mostrar la modal
  async presentModal(message: string, header: string = 'Mensaje') {
    const modal = await this.modalController.create({
      component: MessageModalComponent,
      componentProps: { message, header },
      cssClass: 'custom-modal', // Clase personalizada
      backdropDismiss: true, // Habilita que se pueda cerrar al tocar fuera
    });
  
    return await modal.present();
  }
  
}
