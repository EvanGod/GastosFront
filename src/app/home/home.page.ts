import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  logout() {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    
    // Redirigir al usuario a la página de login
    this.router.navigate(['/login']);
  }
}
