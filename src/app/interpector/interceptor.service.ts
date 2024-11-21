import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken(); // Assuming getToken() returns the token

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    console.log('Request Headers:', request.headers);

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Handle non-JSON responses
          if (event.body && typeof event.body === 'string' && event.body.startsWith('Hello')) {
            console.log('Non-JSON response:', event.body);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.authService.logout();
            this.router.navigate(['/login']);
            break;
          case 403:
            console.log("Fallo");
            break;
        }
        return throwError(error);
      })
    );
  }
}
