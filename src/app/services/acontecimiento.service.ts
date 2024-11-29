import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Acontecimineto} from '../modelos/Acontecimineto';

@Injectable({ providedIn: 'root' })
export class AcontecimientoService {

  constructor(private http: HttpClient) {}

  getAcontecimiento(): Observable<any[]> {
    return this.http.get<any[]>("/api/acontecimiento/listar");
  }

  getAcontecimientosByOngId(ongId: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/acontecimiento/ong/${ongId}/acontecimientos`);
  }

  getAcontecimientoById(id: number): Observable<Acontecimineto> {
    return this.http.get<Acontecimineto>(`/api/acontecimiento/getById/${id}`)
  }

  getAcontecimientoById(acontecimientoId: string): Observable<any> {
    return this.http.get<any>(`${this.authUrl}/detalles/${acontecimientoId}`);
  }

}
