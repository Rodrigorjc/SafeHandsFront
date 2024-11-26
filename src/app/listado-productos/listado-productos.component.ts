import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Producto} from '../modelos/Producto';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Acontecimineto} from '../modelos/Acontecimineto';
import {ProductoService} from '../services/producto.service';

@Component({
  selector: 'app-listado-productos',
  imports: [
    NgForOf
  ],
  templateUrl: './listado-productos.component.html',
  standalone: true,
  styleUrl: './listado-productos.component.css'
})
export class ListadoProductosComponent implements OnInit{
  productos: Producto [] = [];
  acontecimiento: Acontecimineto = {} as Acontecimineto;

  constructor( private service: AcontecimientoService, private producto: ProductoService , private route: ActivatedRoute) {}


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
      },
      error: (error) => {
        console.error('Error al obtener datos', error);
      }
    });
  }
}
