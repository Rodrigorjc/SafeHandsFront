import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Producto} from '../modelos/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private authUrl = 'http://localhost:8081/producto';
  constructor(private http:HttpClient) {}


  crearProducto(product: any): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/crear`, product);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.authUrl}/eliminar/${id}`);
  }


  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.authUrl}/listar`);
  }

  obtenerProductoId(id: string): Observable<any> {
    return this.http.get<any>(`${this.authUrl}/listar/${id}`);
  }


  vincularProductoAcontecimiento(productoId: number, acontecimientoId: number): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/${productoId}/vincular/${acontecimientoId}`, {});
  }

  obtenerProductosAconteciminetoId(id:number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`/api/producto/getProductosAcontecimiento/${id}`);
  }

}
