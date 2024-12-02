import {Component, OnInit} from '@angular/core';
import {ProveedorService} from '../services/proveedor.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../productos-proveedor/productos-proveedor.component';
import {ProductoService} from '../services/producto.service';
import {CurrencyPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-proveedor-detalles',
  imports: [
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './proveedor-detalles.component.html',
  standalone: true,
  styleUrl: './proveedor-detalles.component.css'
})
export class ProveedorDetallesComponent implements OnInit {
  products: Product[] = [];
  productoId: string | null = null;
  proveedor: any;
  proveedorId: any | null = null;

  constructor(private proveedorService: ProveedorService, private  route:ActivatedRoute, private productoService: ProductoService ) {}

  ngOnInit(): void {
    this.proveedorId  = this.route.snapshot.paramMap.get('id');
    if (this.proveedorId) {
      this.proveedorService.getProveedor(this.proveedorId).subscribe({
        next: (data) => {
          this.proveedor = data;
          console.log('Proveedor details', data);
        },
        error: (err) => {
          console.error('Error fetching proveedor details', err);
          alert(`Error fetching proveedor details: ${err.message}`);
        }
      });
    }
    this.loadProducts();
  }


  loadProducts(): void {
    this.productoId = this.route.snapshot.paramMap.get('id');
    if (this.productoId) {
      this.productoService.obtenerProductoId(this.productoId).subscribe({
        next: (data) => {
          this.products = data;
        },

        error: (err) => console.error('Error fetching products', err)
      });
    }
  }

}

