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


  getAcontecimiento(): Observable<any[]> {
    return this.http.get<any[]>("/api/acontecimiento/listar");
  }

  /**
   * Obtiene una lista de todos los Acontecimientos desde el servidor.
   *
   * Este metodo envía una solicitud HTTP GET al endpoint de la API de Acontecimiento
   * para recuperar un array de objetos Acontecimiento. La URL del endpoint se construye
   * utilizando la propiedad `apiUrl`.
   *
   * @returns {Observable<Acontecimiento[]>} Un Observable que emite un array de objetos Acontecimiento.
   * El Observable se completará después de emitir el array.
   */
  getListarAcontecimientos(): Observable<Acontecimiento[]> {
    return this.http.get<Acontecimiento[]>('/api/aconecimiento/total-donaciones');
  }

  getAcontecimientosByOngId(ongId: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/acontecimiento/ong/${ongId}/acontecimientos`);
  }

  getAcontecimientoById(id: number): Observable<Acontecimineto> {
    return this.http.get<Acontecimineto>(`/api/acontecimiento/getById/${id}`)
  }



  // Acontecimientos ADMIN
  private apiUrl = 'http://localhost:8081/acontecimiento';


/**
 * Obtiene una lista de todos los Acontecimientos desde el servidor.
 *
 * Este metodo envía una solicitud HTTP GET al endpoint de la API de Acontecimiento
 * para recuperar un array de objetos Acontecimiento. La URL del endpoint se construye
 * utilizando la propiedad `apiUrl`.
 *
 * @returns {Observable<Acontecimiento[]>} Un Observable que emite un array de objetos Acontecimiento.
 * El Observable se completará después de emitir el array.
 **/
  getAcontecimientos(): Observable<Acontecimiento[]> {
    return this.http.get<Acontecimiento[]>(`${this.apiUrl}`);
  }

  // getAcontecimientoById(id: number): Observable<Acontecimiento> {
  //   return this.http.get<Acontecimiento>(`${this.apiUrl}/${id}`);
  // }

/**
 * Crea un nuevo Acontecimiento en el servidor.
 *
 * Este metodo envía una solicitud HTTP POST al endpoint de la API de Acontecimiento
 * para crear un nuevo objeto Acontecimiento. La URL del endpoint se construye
 * utilizando la propiedad `apiUrl`.
 *
 * @param {Acontecimiento} acontecimiento - El objeto Acontecimiento que se va a crear.
 * @returns {Observable<Acontecimiento>} Un Observable que emite el objeto Acontecimiento creado.
 * El Observable se completará después de emitir el objeto.
 **/
  crearAcontecimiento(acontecimiento: Acontecimiento): Observable<Acontecimiento> {
    return this.http.post<Acontecimiento>(`${this.apiUrl}`, acontecimiento);
  }


  // /**
  //  * Edita un Acontecimiento en el servidor.
  //  *
  //  * Este metodo envía una solicitud HTTP PUT al endpoint de la API de Acontecimiento
  //  * para editar un objeto Acontecimiento existente. La URL del endpoint se construye
  //  * utilizando la propiedad `apiUrl` y el ID del Acontecimiento.
  //  *
  //  * @param {number} id - El ID del Acontecimiento que se va a editar.
  //  * @param {Acontecimiento} acontecimiento - El objeto Acontecimiento con los nuevos datos.
  //  * @returns {Observable<Acontecimiento>} Un Observable que emite el objeto Acontecimiento editado.
  //  * El Observable se completará después de emitir el objeto.
  //  */
  // editarAcontecimiento(id: number, acontecimiento: Acontecimiento): Observable<Acontecimiento> {
  //   return this.http.put<Acontecimiento>(`${this.apiUrl}/${id}`, acontecimiento);
  // }



  /**
   * Elimina un Acontecimiento del servidor.
   *
   * Este metodo envía una solicitud HTTP DELETE al endpoint de la API de Acontecimiento
   * para eliminar un objeto Acontecimiento. La URL del endpoint se construye
   * utilizando la propiedad `apiUrl` y el ID del Acontecimiento.
   *
   * @param {number} id - El ID del Acontecimiento que se va a eliminar.
   * @returns {Observable<void>} Un Observable que se completa cuando el Acontecimiento ha sido eliminado.
   */
  eliminarAcontecimiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAcontecimientoByIdd(id: string): Observable<Acontecimineto> {
    return this.http.get<Acontecimineto>(`/api/acontecimiento/getById/${id}`)
  }



  crearAcontecimientoOng(acontecimiento: any): Observable<any> {
    return this.http.post<any>(`/api/acontecimiento/crear/acontecimiento/admin/ong`, acontecimiento);
  }

  eliminarAcontecimieto(acontecimientoId: number): Observable<string> {
    return this.http.delete(`/api/acontecimiento/eliminar/${acontecimientoId}`, {responseType: 'text'});
  }
  // crearAcontecimiento(acontecimiento: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/crear`, acontecimiento);
  // }

  editarAcontecimiento(acontecimiento: any, acontecimientoId:any): Observable<any> {
    return this.http.put<any>(`api/acontecimiento/editar/${acontecimientoId}`, acontecimiento);
  }

  getOngPorAcontecimiento(acontecimientoId: any): Observable<any> {
    return this.http.get<any>(`api/acontecimiento/${acontecimientoId}/ongs`);
  }

}
