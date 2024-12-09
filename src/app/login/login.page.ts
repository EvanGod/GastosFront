import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; // Agrega el endpoint de tu backend
import { ModalService } from '../modal.service'; // Importa el servicio de modales

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginData = { email: '', password: '' };

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private modalService: ModalService // Inyectamos el servicio de modales
  ) {}

  onLogin() {
    this.http.post<any>(`${environment.apiUrl}/api/users/login`, this.loginData).subscribe(
      response => {
        // Muestra el mensaje de éxito
        this.modalService.presentModal('Inicio de sesión exitoso');
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error => {
        // Muestra el mensaje de error
        this.modalService.presentModal('Error: ' + error.error.message, 'Error');
      }
    );
  }
}
