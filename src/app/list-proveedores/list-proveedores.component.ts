import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Proveedores} from '../modelos/Proveedores';
import {ProveedorService} from '../services/proveedor.service';

@Component({
  selector: 'app-list-proveedores',
  imports: [
    NgForOf
  ],
  templateUrl: './list-proveedores.component.html',
  standalone: true,
  styleUrl: './list-proveedores.component.css'
})
export class ListProveedoresComponent implements OnInit{
  proveedores: Proveedores[] =  [];

  constructor(private service: ProveedorService) {
  }

  ngOnInit() {
    this.getProveedores();
  }

  getProveedores() {
    this.service.getListadoProveedores().subscribe({
      next: (data : Proveedores[]) => {
       this.proveedores = data;
      },
      error:(error) => {
        console.error('Error al obtener datos', error);
      }
    });
  }
}
