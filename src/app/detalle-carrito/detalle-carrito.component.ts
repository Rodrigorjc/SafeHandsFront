import { Component, OnInit } from '@angular/core';
import { Producto } from '../modelos/Producto';
import { CarritoService } from '../services/carrito.service';
import { CurrencyPipe, NgForOf, NgIf, SlicePipe } from '@angular/common';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductosCarrito } from '../modelos/ProductosCarrito';
import { Pedido } from '../modelos/Pedido';

@Component({
  selector: 'app-detalle-carrito',
  imports: [
    NgForOf,
    CurrencyPipe,
    NgIf,
    FormsModule,
    SlicePipe,
    ReactiveFormsModule
  ],
  templateUrl: './detalle-carrito.component.html',
  standalone: true,
  styleUrl: './detalle-carrito.component.css'
})
export class DetalleCarritoComponent implements OnInit {
  productosEnCarrito: Producto[] = [];
  totalCarrito: number = 0;
  isModalOpen = false;
  pasoActual = 1;
  metodoPagoSeleccionado: string | null = null;

  pagoForm!: FormGroup;

  constructor(public carritoService: CarritoService, private fb: FormBuilder) { }

  ngOnInit() {
    this.pagoForm = this.fb.group({
      tarjeta: this.fb.group({
        numero: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
        titular: ['', Validators.required],
        fecha: ['', Validators.required],
        cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
      }),
      paypal: this.fb.group({
        email: ['', [Validators.required, Validators.email]]
      }),
      transferencia: this.fb.group({
        banco: ['', Validators.required],
        cuenta: ['', Validators.required]
      })
    });

    this.carritoService.carrito$.subscribe(productos => {
      this.productosEnCarrito = productos;
      this.totalCarrito = this.carritoService.obtenerTotalCarrito();
    });
  }

  toggleModal(): void {
    if (this.productosEnCarrito.length === 0) {
      Swal.fire({
        title: 'Carrito vacío',
        text: 'No tienes productos en el carrito.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    } else {
      this.isModalOpen = !this.isModalOpen;
      if (!this.isModalOpen) {
        this.pasoActual = 1; // Reinicia el formulario al cerrar
        this.metodoPagoSeleccionado = null;
      }
    }
  }

  convertirProductosACarritoDTO(): ProductosCarrito[] {
    return this.productosEnCarrito.map(producto => ({
      idProducto: producto.id,
      cantidad: producto.cantidad,
      precioUnitario: producto.precio,
      total: producto.total,
      idAcontecimiento: producto.idAcontecimiento
    }));
  }

  crearPedido(): Pedido {
    const userId = Number(localStorage.getItem('userId'));
    const productos = this.convertirProductosACarritoDTO();
    return new Pedido(userId, productos);
  }

  validarDatosPago(): boolean {
    const metodoPago = this.metodoPagoSeleccionado;
    const formGroup = metodoPago ? this.pagoForm.get(metodoPago) : null;

    if (formGroup && formGroup.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Datos incompletos',
        text: 'Por favor, completa todos los campos correctamente.',
        confirmButtonText: 'OK'
      });
      return false;
    }
    return true;
  }

  siguientePaso(): void {
    if (this.pasoActual === 1 && !this.metodoPagoSeleccionado) {
      Swal.fire({
        icon: 'warning',
        title: 'Método de pago no seleccionado',
        text: 'Por favor, selecciona un método de pago.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (this.pasoActual === 2 && !this.validarDatosPago()) {
      return;
    }

    if (this.pasoActual < 3) {
      this.pasoActual++;
    } else {
      Swal.fire({
        title: 'Procesando pago...',
        text: 'Por favor, espera un momento.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const pedido = this.crearPedido();

      this.carritoService.pagarCarrito(pedido)
        .subscribe({
          next: (response) => {
            if (response === 'Pedido realizado correctamente') {
              Swal.fire({
                icon: 'success',
                title: 'Pago realizado',
                text: 'Tu pedido ha sido procesado correctamente.',
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.isConfirmed) {
                  location.reload();
                }
              });
              this.toggleModal();
              const carrito = localStorage.getItem('carrito');
              if (carrito) {
                localStorage.removeItem('carrito');
              }
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error en el pago',
                text: 'Hubo un problema procesando tu pago. Por favor, inténtalo nuevamente.',
                confirmButtonText: 'Cerrar'
              });
            }
          },
          error: (err) => {
            console.error('Error al realizar el pago:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error en el pago',
              text: 'Hubo un problema procesando tu pago. Por favor, inténtalo nuevamente.',
              confirmButtonText: 'Cerrar'
            });
          }
        });
    }
  }

  pasoAnterior(): void {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }

  getFormGroup(metodo: string): FormGroup {
    return this.pagoForm.get(metodo) as FormGroup;
  }
}
