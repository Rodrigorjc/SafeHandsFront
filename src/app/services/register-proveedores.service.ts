import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {RegistroCliente} from '../modelos/RegistroCliente';
import {Observable} from 'rxjs';
import {RegistroProveedores} from '../modelos/RegistroProveedores';

@Injectable({
  providedIn: 'root'
})
export class RegisterProveedoresService {

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: RegistroProveedores): Observable<any> {
    return this.http.post('/api/proveedor/registrar', userData);
  }
}
