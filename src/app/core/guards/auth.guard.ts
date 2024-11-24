import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { DataService } from '../services/data.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/models/user.model';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const loginService = inject(LoginService);
  const dataService = inject(DataService)
  const token = loginService.getToken();

  if (token) {
    // Si el token existe, el usuario está autenticado
    const response: User | null = loginService.findUserByEmail(token);

    if (response) {
      dataService.setloginSubject = response;
    } else {
      loginService.logout();
      router.navigate(['/login']);
      return false;
    }

    return true;
  } else {
    // Si no está autenticado, redirige al login
    router.navigate(['/login']);
    return false;
  }
};
