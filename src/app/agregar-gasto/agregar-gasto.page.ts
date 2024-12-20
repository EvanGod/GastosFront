import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { GastosService } from '../services/gastos.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular'; // Agregado para la hoja de acción
import { PushNotificationService } from '../services/push-notification.service';

@Component({
  selector: 'app-agregar-gasto',
  templateUrl: './agregar-gasto.page.html',
  styleUrls: ['./agregar-gasto.page.scss'],
})
export class AgregarGastoPage {
  gasto = {
    monto: '',
    descripcion: '',
    ubicacion: '',
  };
  imagenRecibo: string | null = null;
  latitude: number = 0;
  longitude: number = 0;

  constructor(
    private gastosService: GastosService,
    private router: Router,
    private actionSheetController: ActionSheetController, // Inyectamos el ActionSheetController
    private pushNotificationService: PushNotificationService
  ) {}

  // Función para mostrar las opciones de la cámara o galería
  async seleccionarImagen() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccionar una opción',
      buttons: [
        {
          text: 'Tomar foto',
          handler: () => {
            this.tomarFoto();
          },
        },
        {
          text: 'Seleccionar desde galería',
          handler: () => {
            this.seleccionarDesdeGaleria();
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  // Función para tomar una foto con la cámara
  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Camera,
        resultType: CameraResultType.DataUrl, // Obtenemos la imagen como Data URL
      });

      this.imagenRecibo = image.dataUrl ?? null; // Mostramos una vista previa
    } catch (error) {
      console.error('Error al capturar la foto:', error);
    }
  }

  // Función para seleccionar una imagen desde la galería
  async seleccionarDesdeGaleria() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Photos,
        resultType: CameraResultType.DataUrl, // Obtenemos la imagen como Data URL
      });

      this.imagenRecibo = image.dataUrl ?? null; // Mostramos una vista previa
    } catch (error) {
      console.error('Error al seleccionar la foto desde la galería:', error);
    }
  }

  // Obtener la ubicación del dispositivo
  async obtenerUbicacion() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.gasto.ubicacion = `${this.latitude},${this.longitude}`; // Guardamos la ubicación en el objeto del gasto
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

  // Función para guardar la imagen localmente en el directorio adecuado
  async guardarImagenLocal(idGasto: number): Promise<string | null> {
    if (!this.imagenRecibo) {
      return null;
    }

    try {
      const fileName = `gasto-${idGasto}.jpeg`; // Nombre de archivo con el ID del gasto
      const savedFile = await Filesystem.writeFile({
        path: `gastos/${fileName}`, // Guardamos en la carpeta 'gastos'
        data: this.imagenRecibo.split(',')[1], // Extraemos la base64 sin la cabecera
        directory: Directory.Data, // Usamos el directorio Data para almacenamiento local
      });

      console.log('Imagen guardada localmente en:', savedFile.uri);
      return savedFile.uri; // Devolvemos la URI de la imagen guardada
    } catch (error) {
      console.error('Error al guardar la imagen localmente:', error);
      return null;
    }
  }

  // Función para agregar el gasto
  async agregarGasto() {
    if (!this.gasto.monto || !this.gasto.descripcion) {
      alert('Por favor complete todos los campos.');
      return;
    }

    const token = localStorage.getItem('pushToken'); // Obtener el token FCM

    try {
      // Obtener la ubicación antes de guardar el gasto
      await this.obtenerUbicacion();

      /// Envía los datos del gasto y el token de FCM al backend
      const response: any = await this.gastosService.agregarGasto({
        ...this.gasto,
        userToken: token, // Enviar el token de FCM
      }).toPromise();

      // Guarda la imagen localmente con el ID del gasto
      const imagenUri = await this.guardarImagenLocal(response.gastoId);

      if (imagenUri) {
        alert('Gasto agregado exitosamente y la imagen fue guardada.');
      } else {
        alert('Gasto agregado, pero hubo un problema al guardar la imagen.');
      }

      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al agregar el gasto:', error);
      alert('Error al agregar el gasto.');
    }
  }

  // Función para cancelar el proceso de agregar gasto y regresar al home
  cancelar() {
    this.router.navigate(['/home']); // Redirige al home
  }
}
