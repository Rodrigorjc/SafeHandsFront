import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Proveedor} from '../modelos/Proveedor';

@Injectable({ providedIn: 'root' })
export class ProveedorService {
  private apiUrl = 'http://localhost:8081/peticiones/proveedores';

  constructor(private http: HttpClient) {}

  getListarProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

}
