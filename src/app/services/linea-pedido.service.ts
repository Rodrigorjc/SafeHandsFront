import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, Routes} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LineaPedidoService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getTotal(){
    return this.http.get('/api/linea/total');
  }

  obtenerRankingProveedores() {
    return this.http.get('/api/proveedor/ranking');
  }

  obtenerInfoProveedores() {
    return this.http.get('/api/proveedor/info/proveedores');
  }
}
