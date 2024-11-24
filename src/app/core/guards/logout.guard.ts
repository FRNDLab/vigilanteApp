import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const logoutGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const loginService = inject(LoginService);
  const token = loginService.getToken();

  if (!token) {
    // Si no está autenticado, puede acceder
    return true;
  } else {
    // Si está autenticado, redirige al dashboard
    router.navigate(['/home']);
    return false;
  }

};
