// `src/app/vincular-acontecimiento-productos/vincular-acontecimiento-productos.component.ts`
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AcontecimientoService} from '../services/acontecimiento.service';

interface Product {
  id: number;
  nombre: string;
  precio: number;
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
  acontecimientos: any[] = []; // Add a variable to store events
  proveedorId: string | null = null;
  alertMessage: string|null = null;

  constructor(private productoService: ProductoService, private fb: FormBuilder, private route: ActivatedRoute,private eventoService: AcontecimientoService) {
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
          console.log('Productos:', data);
          this.products = data;
        },
        error: (err) => console.error('Error fetching products', err)
      });
    }this.eventoService.getAcontecimiento().subscribe({
      next: (data) => {
        console.log('Acontecimientos:', data);
        this.acontecimientos = data;
      },
      error: (err) => console.error('Error fetching events', err)
    });

  }

  vincularProducto() {
    if (this.vincularForm.invalid) {
      console.error('Formulario inválido');
      return;
    }

    const { productoId, acontecimientoId } = this.vincularForm.value;
    console.log('Producto ID:', productoId);
    console.log('Acontecimiento ID:', acontecimientoId);
    console.log('Proveedor ID:', this.proveedorId);

    this.productoService.vincularProductoAcontecimiento(productoId, acontecimientoId).subscribe({
      next: (response) => {
        console.log('Producto vinculado exitosamente', response);
        this.alertMessage='Producto vinculado exitosamente';
      },
      error: (err) => {
        console.error('Error vinculando producto', err);
        this.alertMessage= 'Error vinculando producto';
      }
    });
  }
}
