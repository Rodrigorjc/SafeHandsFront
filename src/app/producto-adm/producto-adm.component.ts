import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

interface Producto {
  id: number;
  nombre: string;
  urlImagen: string;
  precio: number;
  descripcion: string;
  proveedor: string;
  acontecimiento?: string;
}

@Component({
  selector: 'app-producto-adm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-adm.component.html',
  styleUrls: ['./producto-adm.component.css']
})
export class ProductoAdmComponent {
  productos: Producto[] = [];  // Lista de productos
  productoActual: Producto = this.crearProductoVacio();  // Producto que estamos editando

  // Acontecimientos y proveedores simulados
  acontecimientos: string[] = ['Evento 1', 'Evento 2', 'Evento 3'];
  proveedores: string[] = ['Proveedor A', 'Proveedor B', 'Proveedor C'];

  constructor() {}

  // Crear un producto vacío
  crearProductoVacio(): Producto {
    return {
      id: 0,
      nombre: '',
      urlImagen: '',
      precio: 0,
      descripcion: '',
      proveedor: '',
      acontecimiento: ''
    };
  }

  // Guardar un nuevo producto
  guardarProducto(): void {
    if (this.productoActual.id === 0) {
      this.productoActual.id = Date.now();  // Simulamos un ID único para el producto nuevo
      this.productos.push(this.productoActual);  // Añadir producto a la lista
    }
    this.limpiarFormulario();  // Limpiar formulario después de guardar
  }

  // Editar un producto existente
  editarProducto(): void {
    const index = this.productos.findIndex(p => p.id === this.productoActual.id);
    if (index !== -1) {
      this.productos[index] = this.productoActual;  // Actualizar producto
    }
    this.limpiarFormulario();  // Limpiar formulario después de editar
  }

  // Eliminar un producto
  eliminarProducto(): void {
    this.productos = this.productos.filter(p => p.id !== this.productoActual.id);  // Eliminar producto de la lista
    this.limpiarFormulario();  // Limpiar formulario después de eliminar
  }

  // Limpiar formulario
  limpiarFormulario(): void {
    this.productoActual = this.crearProductoVacio();
  }

  // Cargar un producto para editar
  cargarProductoParaEdicion(producto: Producto): void {
    this.productoActual = { ...producto };  // Copiar el producto para editar
  }

  // Cargar un producto para eliminar
  cargarProductoParaEliminar(producto: Producto): void {
    this.productoActual = { ...producto };  // Copiar el producto para eliminar
  }
}
