import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProveedorService } from '../services/proveedor.service';
import { ProductoService } from '../services/producto.service';
import { Proveedor } from '../modelos/Proveedor';
import Swal from 'sweetalert2';

interface Producto {
  id: number | null;
  nombre: string;
  url: string;
  precio: number;
  descripcion: string;
  idProveedores: number;
  nombreProveedor: string;
}

@Component({
  selector: 'app-producto-adm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-adm.component.html',
  styleUrls: ['./producto-adm.component.css']
})
export class ProductoAdmComponent implements OnInit {
  productoActual: Producto = this.crearProductoVacio();  // Producto que estamos editando
  proveedores: Proveedor[] = [];
  productos: Producto[] = [];

  constructor(private proveedorService: ProveedorService, private productoService: ProductoService) {}

  ngOnInit(): void {
    this.proveedorService.getProveedores().subscribe({
      next: (proveedores) => {
        this.proveedores = proveedores;
      },
      error: (err) => console.error('Error al cargar los proveedores', err),
    });

    this.productoService.obtenerProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: (err) => console.error('Error al cargar los productos', err),
    });
  }

  crearProductoVacio(): Producto {
    return {
      id: null,
      nombre: '',
      url: '',
      precio: 0,
      descripcion: '',
      idProveedores: 0,
      nombreProveedor: ''
    };
  }

  guardarProducto(): void {
    if (this.productoActual.id) {
      this.productoService.editarProducto(this.productoActual).subscribe({
        next: (producto) => {
          Swal.fire('Éxito', 'Producto editado exitosamente', 'success');
          const index = this.productos.findIndex(p => p.id === producto.id);
          if (index !== -1) {
            this.productos[index] = producto;
          }
        },
        error: (err) => console.error('Error al editar el producto', err),
      });
    } else {
      this.productoService.crearProducto(this.productoActual).subscribe({
        next: (producto) => {
          Swal.fire('Éxito', 'Producto creado exitosamente', 'success');
          this.productos.push(producto);
        },
        error: (err) => console.error('Error al guardar el producto', err),
      });
    }
    this.productoActual = this.crearProductoVacio();
  }





  eliminarProducto(id: number | null): void {
    if (id == null) return;

    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Producto eliminado exitosamente', 'success');
        this.productos = this.productos.filter(p => p.id !== id);
      },
      error: (err) => console.error('Error al eliminar el producto', err),
    });
  }

  editarProducto(producto: Producto): void {
    this.productoActual = { ...producto };
  }
}
