import {Component, OnInit} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  Routes
} from '@angular/router';
import {ProductosProveedorComponent} from '../productos-proveedor/productos-proveedor.component';
import {ProveedorService} from '../services/proveedor.service';
const routes: Routes = [
  { path: 'proveedor/productos/:id', component: ProductosProveedorComponent },
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
export class MovilidadProveedoresComponent implements OnInit {
  proveedorId: string | null = null;
  proveedores: any[] = [];
  proveedorDetalles: any = {};

  constructor(private route: ActivatedRoute, private router: Router, private proveedorService: ProveedorService) {}

  ngOnInit() {
    this.proveedorId = this.route.snapshot.paramMap.get('id');
    if (this.proveedorId) {
      this.getProveedorDetalles(this.proveedorId);
      console.log('Proveedor ID:', this.proveedorId);
    }
  }

  getProveedorDetalles(id: string): void {
    this.proveedorService.getProveedor(id).subscribe({
      next: (data) => {
        this.proveedorDetalles = data;
        console.log('Proveedor details:', data);
      },
      error: (err) => {
        console.error('Error fetching proveedor details', err);
      }
    });
  }
}
