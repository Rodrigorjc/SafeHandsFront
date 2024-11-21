import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes} from '@angular/router';
import {ProductosProveedorComponent} from '../productos-proveedor/productos-proveedor.component';
const routes: Routes = [
  { path: 'proveedor/productos', component: ProductosProveedorComponent },
  { path: '', redirectTo: 'movilidad-proveedores', pathMatch: 'full' }
];
@Component({
  selector: 'app-movilidad-proveedores',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './movilidad-proveedores.component.html',
  styleUrl: './movilidad-proveedores.component.css'
})
export class MovilidadProveedoresComponent {

}
