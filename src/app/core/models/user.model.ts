import { Validators } from '@angular/forms';

export interface User {
    name: string | Validators;
    email: string | Validators;
    dni: number | Validators;
    password: string | Validators;
}

export interface Login {
    email: string | Validators;
    password: string | Validators;
}

export interface ForgotEmail {
    email: string | Validators;
}

export interface ForgotPassword {
    password: string | Validators;
    repeat_password: string | Validators;
}

export interface RegisterResult {
    error: boolean;
    message?: string;
}

export interface LoginResult {
    error: boolean;
    message?: string;
}
