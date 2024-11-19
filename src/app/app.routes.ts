import { Routes } from '@angular/router';
import { LoginComponent } from './loginCliente/login.component';
import { RegisterComponent } from './registerCliente/register.component';
import { HomeComponent } from './home/home.component';
import {DemoComponent} from './demo/demo.component';
import {ProductosProveedorComponent} from './productos-proveedor/productos-proveedor.component';
import {OngDetallesComponent} from './ong-detalles/ong-detalles.component';
import {RegisterProveedoresComponent} from './register-proveedores/register-proveedores.component';
import {HomeProveedorComponent} from './home-proveedor/home-proveedor.component';
import {HomeONGComponent} from './home-ong/home-ong.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'demo', component: DemoComponent},
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'proveedor/productos', component:ProductosProveedorComponent },
  { path:'ong/detalles', component:OngDetallesComponent },
  { path:'ong/detalles/:id', component:OngDetallesComponent },
  { path: 'register/proveedores', component: RegisterProveedoresComponent },
  { path: 'homeProveedor', component: HomeProveedorComponent},
  { path: 'homeONG', component: HomeONGComponent}
  //{ path: '**', redirectTo: '/loginCliente' }  // Redirecciona rutas no encontradas al loginCliente
];
