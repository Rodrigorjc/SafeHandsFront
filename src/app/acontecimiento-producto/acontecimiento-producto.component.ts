import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';

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
  idAcontecimiento: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    // Capturar el parámetro "id" desde la ruta
    this.idAcontecimiento = Number(this.route.snapshot.paramMap.get('id'));

    if (this.idAcontecimiento) {
      // Llamar al servicio para obtener los productos relacionados con el acontecimiento
      this.obtenerProductos(this.idAcontecimiento);
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
}
