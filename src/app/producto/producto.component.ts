import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductoService} from '../services/producto.service';
import {Producto} from '../modelos/Producto';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit{
  productos: Producto[] = []; // Array para almacenar los productos

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (productos) => (this.productos = productos),
      error: (err) => console.error('Error al cargar los productos', err),
    });
  }
}


