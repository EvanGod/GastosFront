import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment'; // Agrega el endpoint de tu backend
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  registerData = { nombre: '', email: '', password: '', confirmPassword: '' };

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  onRegister() {
    // Aquí validarás las contraseñas y otros campos

    this.http.post<any>(`${environment.apiUrl}/api/users/register`, this.registerData).subscribe(
      response => {
        // Muestra el mensaje de éxito
        this.showAlert('Usuario registrado con éxito');
        this.router.navigate(['/login']);
      },
      error => {
        // Muestra el mensaje de error
        this.showAlert('Error: ' + error.error.message);
      }
    );
  }

  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
