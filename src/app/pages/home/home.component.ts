import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { User } from '../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  currentUser$: Observable<User | null>;

  constructor(private dataService: DataService, private loginService: LoginService, private router: Router) {
    this.currentUser$ = this.dataService.loginObservable;
    //this.currentUser$.subscribe(data => console.log(data));
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
