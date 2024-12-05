import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pago} from '../modelos/TotalResponse';

@Injectable({ providedIn: 'root' })
export class TotalService {
  private apiUrl = 'http://localhost:8081/total/donaciones';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene el total de pagos desde el servidor.
   *
   * Este metodo envía una solicitud HTTP GET al endpoint de la API de Total
   * para recuperar un objeto Pago. La URL del endpoint se construye
   * utilizando la propiedad `apiUrl`.
   *
   * @returns {Observable<Pago>} Un Observable que emite un objeto Pago.
   * El Observable se completará después de emitir el objeto.
   */
  getTotal(): Observable<Pago> {
    return this.http.get<Pago>(this.apiUrl);
  }
}
