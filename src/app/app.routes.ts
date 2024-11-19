import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import {DemoComponent} from './demo/demo.component';
import {DonacionesComponent} from './donaciones/donaciones.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'demo', component: DemoComponent},
  { path: 'informacion/donaciones', component: DonacionesComponent},
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }  // Redirecciona rutas no encontradas al login
];
