import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TotalService {
  private authUrl = 'http://localhost:8080/total/donaciones';

  constructor(private http: HttpClient) {}

  getTotal(): Observable<any[]> {
    return this.http.get<any[]>(this.authUrl);
  }
}
