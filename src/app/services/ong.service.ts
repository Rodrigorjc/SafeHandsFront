import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OngService {

  private authUrl = 'http://localhost:8081/ong';

  constructor(private http: HttpClient) {
  }

  getOngById(ongId: string): Observable<any> {
    return this.http.get<any>(`${this.authUrl}/detalles/${ongId}`);
  }
}


