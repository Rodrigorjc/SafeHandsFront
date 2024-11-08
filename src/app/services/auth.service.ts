import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUrl = 'http://localhost:8080/api/usuarios/login';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string, password: string }) {
    return this.http.post<{ token: string }>(this.authUrl, credentials)
      .pipe(tap(response => localStorage.setItem('token', response.token)));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  register(userData: { username: string; password: string; email: string }) {
    return this.http.post('http://localhost:8080/api/usuarios/register', userData);
  }

  logout() {
    localStorage.removeItem('token');
    // Add any additional logout logic here
    console.log('Logged out successfully');
  }
}
