import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Proveedor} from '../modelos/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) {
  }
  getListarProveedor(): Observable<any> {
    return this.http.get<any>(`/api/proveedor/listar`);
  }
  getListadoProveedores(): Observable<any> {
    return this.http.get<any>(`/api/proveedor/listado`);
  }

  getProveedor(id: string): Observable<any> {
    return this.http.get<any>(`/api/obtenerId/${id}`);
  }
  getListarProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>("/api/peticiones/proveedores");
  }


}
