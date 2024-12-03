import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import {AcontecimientoService} from '../services/acontecimiento.service';

@Component({
  selector: 'app-acontecimiento-producto',
  imports: [
    CommonModule
  ],
  templateUrl: './acontecimiento-producto.component.html',
  styleUrls: ['./acontecimiento-producto.component.css']
})
export class AcontecimientoProductoComponent implements OnInit {
  productos: any[] = [];
  acontecimientoId: number | null = null;
  acontecimiento: any;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private acontecimientoService: AcontecimientoService
  ) {}

  ngOnInit(): void {
    // Capturar el parámetro "id" desde la ruta
    this.acontecimientoId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.acontecimientoId) {
      // Llamar al servicio para obtener los productos relacionados con el acontecimiento
      this.obtenerProductos(this.acontecimientoId)
      // Llamar al servicio para obtener los detalles del acontecimiento
      this.obtenerAcontecimiento(this.acontecimientoId);
    }
  }

  obtenerProductos(id: number): void {
    this.productoService.obtenerProductosAconteciminetoId(id).subscribe({
      next: (data: any[]) => (this.productos = data),
      error: (err: any) => {
        console.error('Error fetching productos:', err);
        alert('Error al cargar los productos.');
      }
    });
  }

  obtenerAcontecimiento(id: number): void {
    this.acontecimientoService.getAcontecimientoById(id).subscribe({
      next: (data) => {
        this.acontecimiento = data;
      },
      error: (err) => {
        console.error('Error fetching acontecimiento details', err);
        alert(`Error fetching acontecimiento details: ${err.message}`);
      }
    });
  }
}
