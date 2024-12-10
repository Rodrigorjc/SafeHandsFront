import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Acontecimiento} from '../modelos/Acontecimiento';
import {Proveedor} from '../modelos/Proveedor';
import {Acontecimineto} from '../modelos/Acontecimineto';

@Injectable({ providedIn: 'root' })
export class pagosService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8081/total';



// Pagos ADMIN

  /**
   * Crea un nuevo Pago en el servidor.
   *
   * Este metodo envía una solicitud HTTP POST al endpoint de la API de Pagos
   * para crear un nuevo objeto Pago. La URL del endpoint se construye
   * utilizando la propiedad `apiUrl`.
   *
   * @param {any} pago - El objeto Pago que se va a crear.
   * @returns {Observable<any>} Un Observable que emite el objeto Pago creado.
   * El Observable se completará después de emitir el objeto.
   */
  crearPagos(pago: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear`, pago);
  }

}
