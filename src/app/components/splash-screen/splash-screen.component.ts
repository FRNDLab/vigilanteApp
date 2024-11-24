import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss'
})
export class SplashScreenComponent implements OnInit, OnDestroy {

  step: number = 0;
  timers: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.timers.push(setTimeout(() => this.step = 1, 1500)); // Cambia el color y logo
    this.timers.push(setTimeout(() => this.step = 2, 3000)); // Muestra el spinner
    this.timers.push(setTimeout(() => this.router.navigate(['/login']), 4500)); // Redirige al login
  }

  ngOnDestroy(): void {
    // Limpia los timers
    this.timers.forEach(timer => clearTimeout(timer));
  }

  get logoSrc(): string {
    return this.step === 0 ? 'assets/logos/logo-white.svg' : 'assets/logos/logo-orange.svg';
  }

}
