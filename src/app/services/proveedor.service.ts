import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProveedorService {
  private apiUrl = 'http://localhost:8081/api/peticiones/proveedores';

  constructor(private http: HttpClient) {}

  getListarProveedores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }



}
