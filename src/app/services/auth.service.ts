import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {Router} from '@angular/router';
import {RegistroCliente} from '../modelos/RegistroCliente';
import {Observable} from 'rxjs';
import {Login} from '../modelos/Login';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: Login) {
    localStorage.removeItem('token');
    return this.http.post<{ token: string }>('http://localhost:8081/api/usuarios/login', credentials)
      .pipe(tap(response => localStorage.setItem('token', response.token)));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  register(userData: RegistroCliente): Observable<any> {
    return this.http.post('/api/usuarios/register', userData);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
    // Add any additional logout logic here
    console.log('Logged out successfully');
  }

  autorizarPeticion(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return {headers:headers}
  }
}
