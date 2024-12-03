import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Acontecimiento} from '../modelos/Acontecimiento';
import {Proveedor} from '../modelos/Proveedor';
import {Acontecimineto} from '../modelos/Acontecimineto';

@Injectable({ providedIn: 'root' })
export class AcontecimientoService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8081/acontecimiento';


  getAcontecimiento(): Observable<any[]> {
    return this.http.get<any[]>("/acontecimiento/listar");
  }

  // Metodo para listar todos los acontecimientos
  getListarAcontecimientos(): Observable<Acontecimiento[]> {
    return this.http.get<Acontecimiento[]>('/acontecimiento/total-donaciones');
  }

  getAcontecimientosByOngId(ongId: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/acontecimiento/ong/${ongId}/acontecimientos`);
  }



// getAcontecimientoById(id: number): Observable<Acontecimineto> {
//   return this.http.get<Acontecimineto>(`/api/acontecimiento/getById/${id}`)
// }



  // Acontecimientos ADMIN
  crearAcontecimiento(acontecimiento: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear`, acontecimiento);
  }

}
