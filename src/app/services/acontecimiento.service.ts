import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AcontecimientoService {
  private authUrl = 'http://localhost:8081/acontecimiento';

  constructor(private http: HttpClient) {}

  getAcontecimiento(): Observable<any[]> {
    return this.http.get<any[]>(this.authUrl+"/listar");
  }

  getAcontecimientosByOngId(ongId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.authUrl}/ong/${ongId}/acontecimientos`);
  }

  getAcontecimientoById(acontecimientoId: string): Observable<any> {
    return this.http.get<any>(`${this.authUrl}/detalles/${acontecimientoId}`);
  }

  crearAcontecimientoOng(acontecimiento: any): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/crear/acontecimiento/admin/ong`, acontecimiento);
  }

  eliminarAcontecimieto(acontecimientoId: number): Observable<string> {
    return this.http.delete(`${this.authUrl}/eliminar/${acontecimientoId}`,{ responseType:'text'} );
  }

  editarAcontecimiento(acontecimiento: any, acontecimientoId:any): Observable<any> {
    return this.http.put<any>(`api/acontecimiento/editar/${acontecimientoId}`, acontecimiento);
  }

}
