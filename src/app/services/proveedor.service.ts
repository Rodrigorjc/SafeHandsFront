import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private authUrl = 'http://localhost:8081/proveedor';

  constructor(private http: HttpClient) {
  }
  getListarProveedores(): Observable<any> {
    return this.http.get<any>(`${this.authUrl}/listar`);
  }
  getProveedor(id: string): Observable<any> {
    return this.http.get<any>(`${this.authUrl}/obtenerId/${id}`);
  }

}
