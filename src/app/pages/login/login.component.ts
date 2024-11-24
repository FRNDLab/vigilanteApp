import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, Login, LoginResult } from '../../core/models/user.model';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  alerts: { type: string, message: string } | null = null;

  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.fb.group<Login>({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  handleSubmit(): void {
    this.alerts = null;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password }: Login = this.loginForm.value;

    // Llama al servicio de login
    const result: LoginResult = this.loginService.login(email, password);

    if (result.error) {
      this.alerts = { type: 'danger', message: result.message! }; // Muestra el mensaje de error
    } else {
      this.router.navigate(['/home']);
      this.loginForm.reset();
    }
  }

}
