import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {LineaPedidoService} from '../services/linea-pedido.service';
import {Acontecimineto} from '../modelos/Acontecimineto';
import {data} from 'autoprefixer';
import {ProveedorInfo} from '../modelos/ProveedorInfo';
import {FormsModule} from '@angular/forms';
import {AconteciminetoInfo} from '../modelos/AconteciminetoInfo';

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
  aconteciminetos: AconteciminetoInfo[] = [];
  aconteciminetoSeleccionadoId: string = '';
  aconteciminetoSeleccionado: AconteciminetoInfo | null = null;

  constructor(private service: LineaPedidoService, private router: Router) {}

  ngOnInit() {
    this.getTotal();
    this.cargarRanking();
    this.cargarInfoProveedores();
    this.cargarInfoAcontecimiento();
  }

  redireccion() {
    this.router.navigate(['/listado/acontecimientos']);
  }

  getTotal(){
    return this.service.getTotal().subscribe({
      next: (response: any) => {
        this.totalDonaciones = response.total;
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
    });
  }

  seleccionarProveedor(): void {
    console.log('ID seleccionado:', this.proveedorSeleccionadoId); // Verifica el valor seleccionado
    if (this.proveedorSeleccionadoId !== '') {
      this.proveedorSeleccionado = this.proveedores.find(
        (p) => p.id === +this.proveedorSeleccionadoId
      ) || null;
    } else {
      this.proveedorSeleccionado = null;
    }
  }

  cargarInfoAcontecimiento(): void {
    this.service.obtenerInfoAcontecimineto().subscribe((data: any) => {
      this.aconteciminetos = data;
    });
  }

  seleccionarAcontecimiento(): void {
    console.log('ID seleccionado:', this.aconteciminetoSeleccionadoId); // Verifica el valor seleccionado
    if (this.aconteciminetoSeleccionadoId !== '') {
      this.aconteciminetoSeleccionado = this.aconteciminetos.find(
        (p) => p.id === +this.aconteciminetoSeleccionadoId
      ) || null;
    } else {
      this.aconteciminetoSeleccionado = null;
    }
  }
}
