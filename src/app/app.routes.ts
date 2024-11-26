import { Routes } from '@angular/router';
import { LoginComponent } from './loginCliente/login.component';
import { RegisterComponent } from './registerCliente/register.component';
import { HomeComponent } from './home/home.component';
import {DemoComponent} from './demo/demo.component';
import {ProductosProveedorComponent} from './productos-proveedor/productos-proveedor.component';
import {OngDetallesComponent} from './ong-detalles/ong-detalles.component';
import {ValidarProveedorComponent} from './validar-proveedor/validar-proveedor.component';
import {RegisterProveedoresComponent} from './register-proveedores/register-proveedores.component';
import {HomeProveedorComponent} from './home-proveedor/home-proveedor.component';
import {HomeONGComponent} from './home-ong/home-ong.component';
import {
  VincularAcontecimientoProductosComponent
} from './vincular-acontecimiento-productos/vincular-acontecimiento-productos.component';
import {OngAsociarAcontecimientoComponent} from './ong-asociar-acontecimiento/ong-asociar-acontecimiento.component';
import {MovilidadProveedoresComponent} from './movilidad-proveedores/movilidad-proveedores.component';
import {AdminOngComponent} from './admin-ong/admin-ong.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'demo', component: DemoComponent},
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {path: 'proveedor/productos', component:ProductosProveedorComponent},
  {path: 'proveedor/productos/:id', component:ProductosProveedorComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'ong/detalles', component:OngDetallesComponent},//para clientes
  {path:'ong/detalles/:id', component:OngDetallesComponent},//para clientes
  {path:'acontecimiento/ong/:id/acontecimientos', component:OngDetallesComponent},
  {path:'ong/validar/proveedor', component:ValidarProveedorComponent},//para ong
  {path:'ong/validar/proveedor/:id', component:ValidarProveedorComponent},//para ong
  { path: 'homeProveedor/:id', component: HomeProveedorComponent},
  { path: 'homeONG/:id', component: HomeONGComponent},//para ong
  { path: 'register/proveedores', component: RegisterProveedoresComponent },
  {path:'proveedor/vincular/acontecimiento/:id', component:VincularAcontecimientoProductosComponent},
  {path:'ong/acontecimientos/:id', component:OngAsociarAcontecimientoComponent},//para ong
  {path:'movilidad-proveedores/:id', component:MovilidadProveedoresComponent},
  {path:'admin/ong', component:AdminOngComponent},
  { path: '', redirectTo: 'movilidad-proveedores', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Redirecciona rutas no encontradas al login

  //{ path: '**', redirectTo: '/loginCliente' }  // Redirecciona rutas no encontradas al loginCliente
];
