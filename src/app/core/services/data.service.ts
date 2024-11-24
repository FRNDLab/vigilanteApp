import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private loginSubject = new BehaviorSubject<User | null>(null);

  constructor() { }

  get loginObservable(): Observable<User | null> {
    return this.loginSubject.asObservable();
  }

  set setloginSubject(data: User) {
    this.loginSubject.next(data);
  }

}
