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
    return this.http.get<any>(`api/ong/detalles/${ongId}`);
  }


  validarProveedor(proveedorId: number): Observable<any> {
    return this.http.post<any>(`api/ong/validar/proveedor/${proveedorId}`,{});
  }

  eliminarProveedor(proveedorId: number): Observable<any> {
    return  this.http.delete<any>(`api/ong/eliminar/proveedor/${proveedorId}`);
  }

  asociarAcontecimiento(acontecimientoId: number): Observable<any> {
    return this.http.post<any>(`api/ong/asociarAcontecimiento/${acontecimientoId}`,{});
  }

  listarOngs(): Observable<any> {
    return this.http.get<any>(`api/ong/listar`);
  }

  crearOng(ong: any): any {
    return this.http.post<any>(`api/ong/crear`, ong);
  }

  eliminarAcontecimientoAsociado(ongId: number, acontecimientoId: number): Observable<any> {
    return this.http.delete<any>(`api/ong/eliminar/acontecimientosAsociados/${ongId}/${acontecimientoId}`, );
  }

  getIdOngPorIdUsuario(idUsuario: number): Observable<any> {
    return this.http.get<any>(`api/ong/usuario/${idUsuario}/ongId`);
  }


}


