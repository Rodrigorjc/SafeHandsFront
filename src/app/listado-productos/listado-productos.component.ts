import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {Producto} from '../modelos/Producto';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {ActivatedRoute} from '@angular/router';
import {Acontecimineto} from '../modelos/Acontecimineto';
import {ProductoService} from '../services/producto.service';
import {FormsModule} from '@angular/forms';
import {CarritoService} from '../services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-productos',
  imports: [
    NgForOf,
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './listado-productos.component.html',
  standalone: true,
  styleUrl: './listado-productos.component.css'
})
export class ListadoProductosComponent implements OnInit{
  productos: Producto [] = [];
  originalProductos: Producto[] = [];
  acontecimiento: Acontecimineto = {} as Acontecimineto;
  sortCriteria: string = '';


  constructor( private service: AcontecimientoService, private producto: ProductoService , private route: ActivatedRoute, private carritoService: CarritoService) {}


  ngOnInit() {
    this.route.params.subscribe(params => {
      const  id = +params['id'];
      this.cargarDatosAcontecimiento(id);
      this.cargarDatosProducto(id);
    });

  }

  cargarDatosAcontecimiento(id: number) {
    this.service.getAcontecimientoById(id).subscribe({
      next:(data: Acontecimineto) => {
        this.acontecimiento = data;
      },
      error: (error) => {
        console.error('Error al obtener datos', error);
      }
    });
  }
  cargarDatosProducto(id: number) {
    this.producto.obtenerProductosAconteciminetoId(id).subscribe({
      next:(data: Producto[]) => {
        this.productos = data;
        this.originalProductos = [...data];
      },
      error: (error) => {
        console.error('Error al obtener datos', error);
      }
    });
  }
  sortProducts() {
    if (this.sortCriteria === 'price') {
      this.productos.sort((a, b) => (a.precio ?? 0) - (b.precio ?? 0));
    } else {
      this.productos = [...this.originalProductos];
    }
  }

  clearFilter() {
    this.sortCriteria = '';
    this.sortProducts();
  }

  agregarAlCarrito(producto: Producto) {
    Swal.fire({
      title: 'Ingrese la cantidad',
      input: 'number',
      inputAttributes: {
        min: '1',
        max: '10',
        step: '1'
      },
      inputValue: 1,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const cantidad = parseInt(result.value, 10);
        if (cantidad > 0 && cantidad <= 10) {
          for (let i = 0; i < cantidad; i++) {
            this.carritoService.agregarProducto(producto);
          }
          Swal.fire({
            title: 'Producto agregado',
            text: 'El producto ha sido agregado al carrito correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
      }
    });
  }
}
