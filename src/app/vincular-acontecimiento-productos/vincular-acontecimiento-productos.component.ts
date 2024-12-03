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

interface ProveedoresAcontecimiento{
  idAcontecimiento:number;
  idProducto:number;
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
  successMessage: string|null = null;
  proveedoresAcontecimiento: ProveedoresAcontecimiento[] = [];

  constructor(private productoService: ProductoService, private fb: FormBuilder, private route: ActivatedRoute,private eventoService: AcontecimientoService) {
    this.vincularForm = this.fb.group({
      productoId: ['', Validators.required],
      acontecimientoId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.proveedorId = localStorage.getItem('userId'); // Replace with actual provider ID
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

    // Verificar si el producto ya está asociado al acontecimiento
    const productoYaAsociado = this.proveedoresAcontecimiento.some(product => product.idProducto == productoId && product.idAcontecimiento == acontecimientoId);

    if (productoYaAsociado) {
      this.showAlert('El producto ya está asociado a este acontecimiento');
      return;
    }


    this.productoService.vincularProductoAcontecimiento(productoId, acontecimientoId).subscribe({
      next: (response) => {
        console.log('Producto vinculado exitosamente', response);
        this.showSuccess('Producto vinculado exitosamente');
      },
      error: (err) => {
        console.error('Error vinculando producto', err);
        console.info('productoYaAsociado', productoYaAsociado);

        // if (productoYaAsociado) {
        //   this.showAlert('El producto ya está asociado a este acontecimiento');
        //   // return;
        // }else{
          this.showAlert('Error vinculando producto');
        }
      // }
    });
  }
  private showAlert(message: string) {
    this.alertMessage = message;
    setTimeout(() => {
      this.alertMessage = null;
    }, 3000); // Clear the alert after 10 seconds
  }

  private showSuccess(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 3000); // Clear the success message after 10 seconds
  }
}
