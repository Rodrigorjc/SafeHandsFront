import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CurrencyPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-donaciones',
  standalone: true,
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.css'],
  imports: [
    HeaderComponent,
    CurrencyPipe,
    NgIf
  ]
})
export class DonacionesComponent {
  isUserMenuVisible = false;
  isAcontecimientoMenuVisible = false;
  isProveedorMenuVisible = false;
  isModalVisible: boolean = false;


  totalDonaciones: number = 100000;
  ranking: string[] = ['Proveedor 1', 'Proveedor 2', 'Proveedor 3'];
  selectedAcontecimiento: string = 'Valencia';
  donacionesPorAcontecimiento: { [key: string]: number } = {
    Valencia: 5000,
    Florida: 3000,
    Ucrania: 7000,
    Hawaii: 2000,
  };
  imagenesPorAcontecimiento: { [key: string]: string } = {
    Valencia: '/image19.svg',
    Florida: '/imagen22.jpg',
    Ucrania: '/imagen23.jpg',
    Hawaii: '/imagen24.jpg',
  };



  selectedProveedor: string = 'MediaMarkt';
  donacionesPorProveedor: { [key: string]: number } = {
    MediaMarkt: 15000,
    Dia: 20000,
    'El Corte Inglés': 12000,
    Bricodepot: 10000,
  };
  imagenesPorProveedor: { [key: string]: string } = {
    MediaMarkt: 'mediamarkt.svg',
    Dia: 'dia.jpg',
    'El Corte Inglés': 'corteingles.jpg',
    Bricodepot: 'brico.png',
  };


  toggleUserMenu() {
    this.isUserMenuVisible = !this.isUserMenuVisible;
  }

  toggleAcontecimientoMenu() {
    this.isAcontecimientoMenuVisible = !this.isAcontecimientoMenuVisible;
  }

  toggleProveedorMenu() {
    this.isProveedorMenuVisible = !this.isProveedorMenuVisible;
  }

  selectAcontecimiento(acontecimiento: string) {
    this.selectedAcontecimiento = acontecimiento;
    this.isModalVisible = true;
  }
  closeModal() {
    this.isModalVisible = false;
  }

  selectProveedor(proveedor: string) {
    this.selectedProveedor = proveedor;
    this.isProveedorMenuVisible = false; // Ocultar el menú tras la selección
  }

  getDonacionesAcontecimiento(): number {
    return this.donacionesPorAcontecimiento[this.selectedAcontecimiento] || 0;
  }

  getImagenAcontecimiento(): string {
    return this.imagenesPorAcontecimiento[this.selectedAcontecimiento] || '';
  }

  getDonacionesProveedor(): number {
    return this.donacionesPorProveedor[this.selectedProveedor] || 0;
  }

  getImagenProveedor(): string {
    return this.imagenesPorProveedor[this.selectedProveedor] || '';
  }
  protected readonly Object = Object;
}
