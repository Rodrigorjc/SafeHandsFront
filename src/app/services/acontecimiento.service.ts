import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AcontecimientoService {
  private authUrl = 'http://localhost:8080/acontecimiento';

  constructor(private http: HttpClient) {}

  getAcontecimiento(): Observable<any[]> {
    return this.http.get<any[]>(this.authUrl+"/listar");
  }
}
