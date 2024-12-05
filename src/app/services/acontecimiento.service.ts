import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Acontecimiento} from '../modelos/Acontecimiento';
import {Proveedor} from '../modelos/Proveedor';
import {Acontecimineto} from '../modelos/Acontecimineto';

@Injectable({ providedIn: 'root' })
export class AcontecimientoService {

  constructor(private http: HttpClient) {
  }


  getAcontecimiento(): Observable<any[]> {
    return this.http.get<any[]>("/api/acontecimiento/listar");
  }

  // Metodo para listar todos los acontecimientos
  getListarAcontecimientos(): Observable<Acontecimiento[]> {
    return this.http.get<Acontecimiento[]>('/api/aconecimiento/total-donaciones');
  }

  getAcontecimientosByOngId(ongId: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/acontecimiento/ong/${ongId}/acontecimientos`);
  }

  getAcontecimientoById(id: number): Observable<Acontecimineto> {
    return this.http.get<Acontecimineto>(`/api/acontecimiento/getById/${id}`)
  }


  getAcontecimientoByIdd(id: string): Observable<Acontecimineto> {
    return this.http.get<Acontecimineto>(`/api/acontecimiento/getById/${id}`)
  }


  crearAcontecimientoOng(acontecimiento: any): Observable<any> {
    return this.http.post<any>(`api/acontecimiento/crear/acontecimiento/admin/ong`, acontecimiento);
  }

  eliminarAcontecimiento(acontecimientoId: number): Observable<string> {
    return this.http.delete(`/api/acontecimiento/eliminar/${acontecimientoId}`, {responseType: 'text'});
  }

  editarAcontecimiento(acontecimiento: any, acontecimientoId: any): Observable<any> {
    return this.http.put<any>(`api/acontecimiento/editar/${acontecimientoId}`, acontecimiento);
  }

  getOngPorAcontecimiento(acontecimientoId: any): Observable<any> {
    return this.http.get<any>(`api/acontecimiento/${acontecimientoId}/ongs`);
  }
}
