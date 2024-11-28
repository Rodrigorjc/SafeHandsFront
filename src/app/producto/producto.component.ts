import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  productos = [
    { nombre: 'Arroz', url: '/arroz.svg' },
    { nombre: 'Pala', url: '/pala.svg' },
    { nombre: 'Papel Higienico', url: '/papel.svg' },
    { nombre: 'Agua', url: '/agua.svg' },
    { nombre: 'Leche', url: '/leche.svg' },
    { nombre: 'Gel', url: '/gel.svg' },
    { nombre: 'Botas de agua', url: '/bota.svg' },
    { nombre: 'Cubos', url: '/cubo.svg' },
  ];

  constructor() {}

  ngOnInit(): void {

  }

  crearProducto() {

  }
}


