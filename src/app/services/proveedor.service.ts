import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) {
  }
  getListarProveedores(): Observable<any> {
    return this.http.get<any>(`/api/proveedor/listar`);
  }
  getListadoProveedores(): Observable<any> {
    return this.http.get<any>(`/api/proveedor/listado`);
  }
  getProveedor(id: string): Observable<any> {
    return this.http.get<any>(`/api/proveedor/obtenerId/${id}`);
  }

}
