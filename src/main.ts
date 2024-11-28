import { bootstrapApplication } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import {InterceptorService} from './app/interpector/interceptor.service';
import { importProvidersFrom } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    provideRouter(routes),
  ],
}).then(r => console.log('Application started', r));
