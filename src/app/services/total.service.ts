import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TotalService {
  private apiUrl = 'http://localhost:8081/total/donaciones';

  constructor(private http: HttpClient) {}


  getTotal(): Observable<number> {
    return this.http.get<number>(this.apiUrl).pipe(
      tap(response => {
        console.log('Respuesta de la API:', response); // Aquí imprimimos la respuesta para verificar
      })
    );
  }
}
