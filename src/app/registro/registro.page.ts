import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalService } from '../modal.service'; // Importa el servicio de modales
import { environment } from 'src/environments/environment'; // Agrega el endpoint de tu backend

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
    private modalService: ModalService // Inyectamos el servicio de modales
  ) {}

  onRegister() {
    // Aquí validarás las contraseñas y otros campos

    this.http.post<any>(`${environment.apiUrl}/api/users/register`, this.registerData).subscribe(
      response => {
        // Muestra el mensaje de éxito
        this.modalService.presentModal('Usuario registrado con éxito');
        this.router.navigate(['/login']);
      },
      error => {
        // Muestra el mensaje de error
        this.modalService.presentModal('Error: ' + error.error.message, 'Error');
      }
    );
  }
}
