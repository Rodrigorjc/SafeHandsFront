import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {map, switchMap, tap } from 'rxjs/operators';
import {Router} from '@angular/router';
import {RegistroCliente} from '../modelos/RegistroCliente';
import {catchError, Observable, throwError} from 'rxjs';
import {Login} from '../modelos/Login';
import Swal from 'sweetalert2';
import {ActualizarHeaderService} from './actualizar-header.service';
import {Cliente} from '../modelos/Cliente';
import {NombreImg} from '../modelos/NombreImg';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private actualizar: ActualizarHeaderService) {}

  login(credentials: Login) {
    localStorage.removeItem('token');
    return this.http.post<{ token: string }>('http://localhost:8081/usuarios/login', credentials)
      .pipe(tap(response => localStorage.setItem('token', response.token)));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  register(userData: RegistroCliente): Observable<any> {
    return this.http.post('/api/usuarios/register', userData);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
    Swal.fire({
      title: 'Sesión cerrada correctamente',
      text: 'Se ha cerrado sesión correctamente. Vuelve cuando quieras.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    this.actualizar.triggerRefreshHeader();
  }



  autorizarPeticion(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return {headers:headers}
  }

  obtenerImgCliente(id: Observable<string | null>): Observable<any> {
    return id.pipe(
      switchMap(userId => this.http.get<{ img: string }>(`/api/cliente/img/${userId}`)),
      map(response => response.img),
      catchError(this.handleError)
    );
  }

  obtenerImgProveedor(id: Observable<string | null>): Observable<any> {
    return id.pipe(
      switchMap(userId => this.http.get<{ img: string }>(`/api/proveedor/img/${userId}`)),
      map(response => response.img),
      catchError(this.handleError)
    );
  }

  obtenerImgOng(id: Observable<string | null>): Observable<any> {
    return id.pipe(
      switchMap(userId => this.http.get<{ img: string }>(`/api/ong/img/${userId}`)),
      map(response => response.img),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  obtenerCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`/api/cliente/getByUserID/${id}`);
  }

  updateClientePerfil(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`/api/cliente/perfil/${id}`, cliente);
  }

  getProductosDonados(userId: number): Observable<NombreImg[]> {
    return this.http.get<NombreImg[]>(`/api/cliente/${userId}/productos-donados`);
  }

  getAcontecimientosDonados(userId: number): Observable<NombreImg[]> {
    return this.http.get<NombreImg[]>(`/api/cliente/${userId}/acontecimientos-donados`);
  }
}
