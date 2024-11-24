import { Injectable } from '@angular/core';
import { User, Login, LoginResult } from '../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  private storageKey = 'users';

  constructor() { }

  // Método para autenticar al usuario
  login(email: Login['email'], password: Login['password']): LoginResult {
    const users: User[] = this.getUsers();

    // Verifica si el usuario existe y la contraseña coincide
    const user: User | undefined = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Si el usuario es encontrado, se puede devolver un resultado exitoso
      this.setToken(user.email);
      return { error: false };
    } else {
      // Si no se encuentra el usuario o la contraseña no es correcta
      return { error: true, message: 'Correo o contraseña incorrectos' };
    }
  }

  private getUsers(): User[] {

    const users = this.isLocalStorageAvailable ? localStorage.getItem(this.storageKey) : null;

    return users ? JSON.parse(users) : [];
  }

  findUserByEmail(email: User['email']): User | null {
    const users: User[] = this.getUsers();
    return users.find(user => user.email === email) || null;
  }

  private setToken(token: User['email']): void {
    this.isLocalStorageAvailable ? localStorage.setItem('token', token.toString()) : null;
  }

  public getToken(): string | null {
    return this.isLocalStorageAvailable ? localStorage.getItem('token') : null;
  }

  public logout(): void {
    this.isLocalStorageAvailable ? localStorage.removeItem('token') : null;
  }

  private saveUsers(users: User[]): void {
    this.isLocalStorageAvailable ? localStorage.setItem(this.storageKey, JSON.stringify(users)) : null;
  }

  updatePassword(email: User['email'], newPassword: User['password']): boolean {
    const users: User[] = this.getUsers();

    // Encuentra al usuario por correo
    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex === -1) {
      // Si no se encuentra el usuario, devuelve false
      return false;
    }

    // Actualiza la contraseña del usuario
    users[userIndex].password = newPassword;

    // Guarda los usuarios actualizados en localStorage
    this.saveUsers(users);

    return true; // Contraseña actualizada con éxito
  }
}
