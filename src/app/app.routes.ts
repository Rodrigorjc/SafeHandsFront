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
import {InfoDonacionesComponent} from './info-donaciones/info-donaciones.component';
import {MovilidadProveedoresComponent} from './movilidad-proveedores/movilidad-proveedores.component';
import {AdminOngComponent} from './admin-ong/admin-ong.component';
import {ProductoComponent} from './producto/producto.component';
import {ProductoListarComponent} from './producto-listar/producto-listar.component';
import {NosotrosComponent} from './nosotros/nosotros.component';
import {ProductoAdmComponent} from './producto-adm/producto-adm.component';
import {PedidoAdmComponent} from './pedido-adm/pedido-adm.component';
import {AcontecimientoDetallesComponent} from './acontecimiento-detalles/acontecimiento-detalles.component';
import {ProveedorDetallesComponent} from './proveedor-detalles/proveedor-detalles.component';
import {CrearAcontecimientoOngComponent} from './crear-acontecimiento-ong/crear-acontecimiento-ong.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'demo', component: DemoComponent},
  { path: 'producto', component: ProductoComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'producto/listar', component: ProductoListarComponent },
  { path: 'producto/adm', component: ProductoAdmComponent },
  { path: 'pedido/adm', component: PedidoAdmComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'proveedor/productos', component:ProductosProveedorComponent},
  { path: 'proveedor/productos/:id', component:ProductosProveedorComponent},
  // { path:'ong/detalles', component:OngDetallesComponent},
  { path:'ong/detalles/:id', component:OngDetallesComponent},
  { path:'acontecimiento/ong/:id/acontecimientos', component:OngDetallesComponent},
  { path:'ong/validar/proveedor', component:ValidarProveedorComponent},
  { path:'ong/validar/proveedor/:id', component:ValidarProveedorComponent},
  { path: 'homeProveedor', component: HomeProveedorComponent},
  { path: 'homeONG', component: HomeONGComponent},
  { path: 'register/proveedores', component: RegisterProveedoresComponent },
  { path:'proveedor/vincular/acontecimiento/:id', component:VincularAcontecimientoProductosComponent},
  { path:'ong/acontecimientos/:id', component:OngAsociarAcontecimientoComponent},
  { path:'ong/acontecimientos', component:OngAsociarAcontecimientoComponent},
  { path: 'informacion/donaciones', component: InfoDonacionesComponent},
  {path:'admin/ong', component:AdminOngComponent},
  {path:'acontecimientos/detalles/:id', component:AcontecimientoDetallesComponent},
  {path:'proveedor/detalles/:id', component:ProveedorDetallesComponent},
  {path:'ong/crear/acontecimiento', component:CrearAcontecimientoOngComponent},
  { path: '', redirectTo: 'movilidad-proveedores', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' } // Redirecciona rutas no encontradas al login
];
