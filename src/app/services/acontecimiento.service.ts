import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Acontecimiento} from '../modelos/Acontecimiento';

@Injectable({ providedIn: 'root' })
export class AcontecimientoService {
  private authUrl = 'http://localhost:8081/acontecimientos';
  private apiUrl = 'http://localhost:8081/acontecimiento/total';


  constructor(private http: HttpClient) {}

  /**
   * metodo Cintia
   */
  getAcontecimiento(): Observable<Acontecimiento[]> {
    return this.http.get<Acontecimiento[]>(this.apiUrl);
  }

  /**
   * metodo Rodrigo
   */
  getAcontecimientosByOngId(ongId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.authUrl}/ong/${ongId}/acontecimientos`);
  }
}
