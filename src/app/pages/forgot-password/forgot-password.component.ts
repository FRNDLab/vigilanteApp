import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matVpnKeySharp } from '@ng-icons/material-icons/sharp';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, ForgotEmail, ForgotPassword } from '../../core/models/user.model';
import { LoginService } from '../../core/services/login.service';
import { passwordMatchValidator } from '../../core/validators/password-match.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterModule, NgIconComponent, CommonModule, ReactiveFormsModule],
  providers: [provideIcons({ matVpnKeySharp })],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotEmailForm: FormGroup;
  forgotPasswordForm: FormGroup;
  email: ForgotEmail["email"] | null = null;
  alerts: { type: string, message: string } | null = null;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.forgotEmailForm = this.fb.group<ForgotEmail>({
      email: ['', [Validators.required, Validators.email]],
    });

    this.forgotPasswordForm = this.fb.group<ForgotPassword>(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeat_password: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: passwordMatchValidator('password', 'repeat_password') }
    );
  }

  get fe() {
    return this.forgotEmailForm.controls;
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  setPassword(): void {
    this.alerts = null;

    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    const email: ForgotEmail['email'] | null = this.email; // Correo del usuario
    const newPassword = this.forgotPasswordForm.value.password; // Nueva contraseña

    if (!email) {
      this.alerts = { type: 'danger', message: 'Correo no proporcionado.' };
      return;
    }

    const success = this.loginService.updatePassword(email, newPassword);

    if (success) {
      this.alerts = { type: 'success', message: 'Contraseña actualizada exitosamente.' };
      this.forgotPasswordForm.reset();
      setTimeout(() => {
        this.router.navigate(['/login']); // Redirige al login tras 3 segundos
      }, 3000);
    } else {
      this.alerts = { type: 'danger', message: 'No se pudo actualizar la contraseña. Usuario no encontrado.' };
    }
  }

  setEmail(): void {

    this.alerts = null;

    if (this.forgotEmailForm.invalid) {
      this.forgotEmailForm.markAllAsTouched();
      return;
    }

    const { email }: ForgotEmail = this.forgotEmailForm.value;

    // Llama al servicio de login
    const result: User | null = this.loginService.findUserByEmail(email);

    if (result === null) {
      this.alerts = { type: 'danger', message: 'El correo no se encuentra registrado' };
    } else {
      this.email = email;
    }

  }

}
