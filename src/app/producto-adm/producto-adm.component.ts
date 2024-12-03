import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProveedorService} from '../services/proveedor.service';
import {Proveedor} from '../modelos/Proveedor';
import {ProductoService} from '../services/producto.service';
import Swal from 'sweetalert2';

interface Producto {
  id: number|null;
  nombre: string;
  url: string;
  precio: number;
  descripcion: string;
  idProveedores: number;

}

@Component({
  selector: 'app-producto-adm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-adm.component.html',
  styleUrls: ['./producto-adm.component.css']
})
export class ProductoAdmComponent {
  productoActual: Producto = this.crearProductoVacio();  // Producto que estamos editando

  //  proveedores simulados
  proveedores: Proveedor[] = [];

  constructor(private proveedorService:ProveedorService,private productoService: ProductoService) {}

  ngOnInit(): void {
    this.proveedorService.getProveedores().subscribe({
      next: (proveedores) => {
        this.proveedores = proveedores
        console.log('Proveedores cargados', proveedores);
      },
      error: (err) => console.error('Error al cargar los proveedores', err),
    });
  }


  // Crear un producto vacío
  crearProductoVacio(): Producto {
    return {
      id: null,
      nombre: '',
      url: '',
      precio: 0,
      descripcion: '',
      idProveedores: 0
    };
  }

  // Guardar un nuevo producto
  guardarProducto(): void {
    this.productoService.crearProducto(this.productoActual).subscribe({
      next: (producto) => {
        Swal.fire('Éxito', 'Producto creado exitosamente', 'success');

      },
      error: (err) => console.error('Error al guardar el producto', err),
    });

  }

  // editar un producto



}
