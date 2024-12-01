// Pedido.ts
import { ProductosCarrito } from './ProductosCarrito';

export class Pedido {
  idUsuario: number;
  productos: ProductosCarrito[];

  constructor(idUsuario: number, productos: ProductosCarrito[]) {
    this.idUsuario = idUsuario;
    this.productos = productos;
  }
}
