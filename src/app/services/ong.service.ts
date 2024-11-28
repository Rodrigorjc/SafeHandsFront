import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Proveedor} from '../validar-proveedor/validar-proveedor.component';

@Injectable({
  providedIn: 'root'
})
export class OngService {

  private authUrl = 'http://localhost:8081/ong';

  constructor(private http: HttpClient) {
  }

  getOngById(ongId: string): Observable<any> {
    return this.http.get<any>(`${this.authUrl}/detalles/${ongId}`);
  }


  validarProveedor(proveedorId: number): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/validar/proveedor/${proveedorId}`,{});
  }

  eliminarProveedor(proveedorId: number): Observable<any> {
    return  this.http.delete<any>(`${this.authUrl}/eliminar/proveedor/${proveedorId}`);
  }

  getOngs(): Observable<any> {
    return this.http.get(this.authUrl);
  }

  asociarAcontecimiento(acontecimientoId: number): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/asociarAcontecimiento/${acontecimientoId}`,{});
  }




}


