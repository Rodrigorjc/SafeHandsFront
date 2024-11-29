import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private authUrl = 'http://localhost:8081/admin';

  constructor(private http: HttpClient) {
  }


   eliminarOng(ongId: any): any {
     return this.http.delete(`${this.authUrl}/eliminar/ong/${ongId}`);
   }

   editarOng(ongId: any): any {
     return this.http.put(`${this.authUrl}/editar/${ongId}`, ongId);
   }

}
