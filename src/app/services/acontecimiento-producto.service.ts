import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8081/producto/acontecimiento';

  constructor(private http: HttpClient) {}

  obtenerProductosAconteciminetoId(idAcontecimiento: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${idAcontecimiento}`);
  }
}
