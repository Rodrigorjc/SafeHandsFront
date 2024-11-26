import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pago} from '../modelos/TotalResponse';

@Injectable({ providedIn: 'root' })
export class TotalService {
  private apiUrl = 'http://localhost:8081/total/donaciones';

  constructor(private http: HttpClient) {}

  getTotal(): Observable<Pago> {
    return this.http.get<Pago>(this.apiUrl);
  }
}
