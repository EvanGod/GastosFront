import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuardProtectedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);  // Usar `inject` para inyectar el Router
  const token = localStorage.getItem('token');  // Obtener el token de localStorage

  if (token) {
    // Si el token existe, permitir el acceso a la ruta
    return true;
  } else {
    // Si no hay token, redirigir al login
    router.navigate(['/login']);
    return false;
  }
};
