import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { logoutGuard } from './core/guards/logout.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/splash-screen/splash-screen.component').then(m => m.SplashScreenComponent),
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [authGuard]
    },    
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        canActivate: [logoutGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
        canActivate: [logoutGuard]
    },
    {
        path: 'forgot',
        loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
        canActivate: [logoutGuard]
    }        
];
