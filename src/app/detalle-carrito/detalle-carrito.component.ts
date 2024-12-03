import {Component, OnInit} from '@angular/core';
import { Producto } from '../modelos/Producto';
import { CarritoService } from '../services/carrito.service';
import {CurrencyPipe, JsonPipe, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import Swal from 'sweetalert2';
import {ProductosCarrito} from '../modelos/ProductosCarrito';
import {Pedido} from '../modelos/Pedido';


@Component({
  selector: 'app-detalle-carrito',
  imports: [
    NgForOf,
    CurrencyPipe,
    NgIf,
    FormsModule,
    SlicePipe
  ],
  templateUrl: './detalle-carrito.component.html',
  standalone: true,
  styleUrl: './detalle-carrito.component.css'
})
export class DetalleCarritoComponent implements OnInit{
  productosEnCarrito: Producto[] = [];
  totalCarrito: number = 0;
  isModalOpen = false;
  pasoActual = 1;
  metodoPagoSeleccionado: string | null = null;

  datosPago: { [key: string]: any } = {
    tarjeta: { numero: '', titular: '', fecha: '', cvv: '' },
    paypal: { email: '' },
    transferencia: { banco: '', cuenta: '' }
  };

  constructor(public carritoService: CarritoService) { }

  ngOnInit() {
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
      total: producto.total
    }));
  }

  crearPedido(): Pedido {
    const userId = Number(localStorage.getItem('userId'));
    const productos = this.convertirProductosACarritoDTO();
    return new Pedido(userId, productos);
  }

  siguientePaso(): void {
    if (this.pasoActual < 3) {
      this.pasoActual++;
    } else {
      // Muestra SweetAlert2 con el spinner de carga
      Swal.fire({
        title: 'Procesando pago...',
        text: 'Por favor, espera un momento.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading(); // Activa el spinner
        }
      });

      const pedido = this.crearPedido();


      // Realiza la petición al backend
      this.carritoService.pagarCarrito(pedido)
        .subscribe({
          next: (response) => {
            console.log('Respuesta del backend:', response); // Agregar log para depuración
            if (response === 'Pedido realizado correctamente') {
              // Pago exitoso
              Swal.fire({
                icon: 'success',
                title: '¡Pago realizado con éxito!',
                text: 'Gracias por su compra.',
                confirmButtonText: 'Cerrar'
              }).then(() => {
                window.location.reload(); // Recarga la página
              });
              this.toggleModal();
              const carrito = localStorage.getItem('carrito');
              if (carrito) {
                localStorage.removeItem('carrito');
              }
            } else {
              // Error en el pago
              Swal.fire({
                icon: 'error',
                title: 'Error en el pago',
                text: 'Hubo un problema procesando tu pago. Por favor, inténtalo nuevamente.',
                confirmButtonText: 'Cerrar'
              });
            }
          },
          error: (err) => {
            // Error en el pago
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

}
