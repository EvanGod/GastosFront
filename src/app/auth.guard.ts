import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Si hay token, redirigir al home
      this.router.navigate(['/home']);
      return false;  // No permite que accedan a login o register
    } else {
      // Si no hay token, permitir acceso a login o register
      return true;
    }
  }

  
}
