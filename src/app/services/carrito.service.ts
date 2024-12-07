import { Injectable } from '@angular/core';
import { Producto } from '../modelos/Producto';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pedido} from '../modelos/Pedido';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productosEnCarrito: Producto[] = this.cargarCarrito();
  private carritoSubject = new BehaviorSubject<Producto[]>(this.productosEnCarrito);

  carrito$ = this.carritoSubject.asObservable();

  constructor(private http: HttpClient ) {
  }

  private guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.productosEnCarrito));
  }

  private cargarCarrito(): Producto[] {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
  }

  agregarProducto(producto: Producto) {
    const productoExistente = this.productosEnCarrito.find(p => p.id === producto.id);
    if (productoExistente) {
      productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
      if (productoExistente.precio !== undefined) {
        productoExistente.total = (productoExistente.cantidad * productoExistente.precio);
      }
    } else {
      producto.cantidad = 1;
      if (producto.precio !== undefined) {
        producto.total = producto.cantidad * producto.precio;
      }
      this.productosEnCarrito.push(producto);
    }
    this.guardarCarrito();
    this.carritoSubject.next(this.productosEnCarrito);
  }

  obtenerProductos() {
    return this.productosEnCarrito;
  }

  eliminarProducto(producto: Producto) {
    this.productosEnCarrito = this.productosEnCarrito.filter(p => p.id !== producto.id);
    this.guardarCarrito();
    this.carritoSubject.next(this.productosEnCarrito);
  }

  vaciarCarrito() {
    this.productosEnCarrito = [];
    this.guardarCarrito();
    this.carritoSubject.next(this.productosEnCarrito);
  }

  obtenerTotalCarrito(): number {
    return this.productosEnCarrito.reduce((total, producto) => total + (producto.total || 0), 0);
  }

  pagarCarrito(pedido: Pedido): Observable<any>  {
    return this.http.post('/api/pedidos/realizar/pedido', pedido, { responseType: 'text' });
  }

  aumentarCantidad(producto: Producto) {
    const productoExistente = this.productosEnCarrito.find(p => p.id === producto.id);
    if (productoExistente) {
      productoExistente.cantidad = (productoExistente.cantidad ?? 1) + 1;
      if (productoExistente.precio !== undefined) {
        productoExistente.total = productoExistente.cantidad * productoExistente.precio;
      }
      this.guardarCarrito();
      this.carritoSubject.next(this.productosEnCarrito);
    }
  }

  disminuirCantidad(producto: Producto) {
    const productoExistente = this.productosEnCarrito.find(p => p.id === producto.id);
    if (productoExistente && productoExistente.cantidad !== undefined) {
      if (productoExistente.cantidad > 1) {
        productoExistente.cantidad -= 1;
        if (productoExistente.precio !== undefined) {
          productoExistente.total = productoExistente.cantidad * productoExistente.precio;
        }
        this.guardarCarrito();
        this.carritoSubject.next(this.productosEnCarrito);
      } else {
        Swal.fire({
          title: '¿Desea borrar el producto?',
          text: 'La cantidad es 1. Si continúa, el producto será eliminado del carrito.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.eliminarProducto(producto);
          }
        });
      }
    }
  }
}
