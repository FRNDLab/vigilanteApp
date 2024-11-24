import { Injectable } from '@angular/core';
import { User, RegisterResult } from '../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  private storageKey = 'users';

  constructor() { }

  register(user: User): RegisterResult {
    // Obtiene la lista de usuarios existentes de localStorage
    const users: User[] = this.getUsers();

    // Verifica si el usuario ya existe
    const userExists = users.some(existingUser => existingUser.email === user.email || existingUser.dni === user.dni);
    if (userExists) {
      console.log('El usuario ya está registrado');
      return {
        error: true,
        message: 'El usuario ya está registrado'
      };
    }

    // Si no existe, se agrega el nuevo usuario al array
    users.push(user);

    // Guarda el array actualizado de usuarios en localStorage
    this.saveUsers(users);

    console.log('Usuario registrado exitosamente');
    return {
      error: false
    };
  }

  private getUsers(): User[] {
    const users = this.isLocalStorageAvailable ? localStorage.getItem(this.storageKey) : null;
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: User[]): void {
    this.isLocalStorageAvailable ? localStorage.setItem(this.storageKey, JSON.stringify(users)) : null;
  }
}
