// `src/app/vincular-acontecimiento-productos/vincular-acontecimiento-productos.component.ts`
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from '@angular/router';

interface Product {
  id: string;
  nombre: string;
}

@Component({
  selector: 'app-vincular-acontecimiento-productos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './vincular-acontecimiento-productos.component.html',
  styleUrl: './vincular-acontecimiento-productos.component.css'
})
export class VincularAcontecimientoProductosComponent implements OnInit {
  vincularForm: FormGroup;
  products: Product[] = [];
  proveedorId: string | null = null;

  constructor(private productoService: ProductoService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.vincularForm = this.fb.group({
      productoId: ['', Validators.required],
      acontecimientoId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.proveedorId = this.route.snapshot.paramMap.get('id'); // Replace with actual provider ID
    if (this.proveedorId) {
      this.productoService.obtenerProductoId(this.proveedorId).subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => console.error('Error fetching products', err)
      });
    }
  }

  vincularProducto() {
    if (this.vincularForm.invalid) {
      return;
    }

    const { productoId, acontecimientoId } = this.vincularForm.value;
    this.productoService.vincularProductoAcontecimiento(productoId, acontecimientoId).subscribe({
      next: (response) => {
        console.log('Producto vinculado exitosamente', response);
      },
      error: (err) => console.error('Error vinculando producto', err)
    });
  }
}
