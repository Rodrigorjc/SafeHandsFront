import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {LineaPedidoService} from '../services/linea-pedido.service';
import {Acontecimineto} from '../modelos/Acontecimineto';
import {data} from 'autoprefixer';
import {ProveedorInfo} from '../modelos/ProveedorInfo';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-info-donaciones',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    NgIf,
    FormsModule
  ],
  templateUrl: './info-donaciones.component.html',
  styleUrl: './info-donaciones.component.css'
})
export class InfoDonacionesComponent implements OnInit{
  totalDonaciones: number = 0;
  rankingProveedores: { nombreProveedor: string; totalDonaciones: number }[] = [];
  maxDonaciones: number = 0;
  proveedores: ProveedorInfo[] = [];
  proveedorSeleccionadoId: string = '';
  proveedorSeleccionado: ProveedorInfo | null = null;

  constructor(private service: LineaPedidoService, private router: Router) {}

  ngOnInit() {
    this.getTotal();
    this.cargarRanking();
    this.cargarInfoProveedores();
  }

  redireccion() {
    this.router.navigate(['/listado/aconteciminetos']);
  }

  getTotal(){
    return this.service.getTotal().subscribe({
      next: (response: any) => {
        this.totalDonaciones = response.total;
        console.log('Total:', response.total);
      },
      error: (error) => {
        console.error('Error', error);
      }
    });
  }

  cargarRanking(): void {
    this.service.obtenerRankingProveedores().subscribe((data: any) => {
      this.rankingProveedores = data;
      this.maxDonaciones = Math.max(
        ...this.rankingProveedores.map((p) => p.totalDonaciones)
      );
    });
  }

  cargarInfoProveedores(): void {
    this.service.obtenerInfoProveedores().subscribe((data: any) => {
      this.proveedores = data;
      console.log(this.proveedores);
    })
  }

  seleccionarProveedor(): void {
    console.log('ID seleccionado:', this.proveedorSeleccionadoId); // Verifica el valor seleccionado
    if (this.proveedorSeleccionadoId !== '') {
      this.proveedorSeleccionado = this.proveedores.find(
        (p) => p.id === +this.proveedorSeleccionadoId
      ) || null;
      console.log('Proveedor seleccionado:', this.proveedorSeleccionado); // Verifica el objeto seleccionado
    } else {
      this.proveedorSeleccionado = null;
    }
  }
}
