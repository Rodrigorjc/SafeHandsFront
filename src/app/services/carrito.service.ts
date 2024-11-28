import { Injectable } from '@angular/core';
import { Producto } from '../modelos/Producto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productosEnCarrito: Producto[] = this.cargarCarrito();
  private carritoSubject = new BehaviorSubject<Producto[]>(this.productosEnCarrito);

  carrito$ = this.carritoSubject.asObservable();

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
    } else {
      producto.cantidad = 1;
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
}
