import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, RegisterResult } from '../../core/models/user.model';
import { RegisterService } from '../../core/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  alerts: { type: string; message: string | undefined } | null = null;
  registerStatus: boolean = false;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.registerForm = this.fb.group<User>({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  handleSubmit(): void {

    this.alerts = null;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const user: User = this.registerForm.value;
    const success: RegisterResult = this.registerService.register(user);

    if (success.error) {
      this.alerts = { type: 'danger', message: success.message };
    } else {
      this.registerForm.reset();
      this.registerStatus = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }

  }
}
