import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-producto-listar',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './producto-listar.component.html',
  styleUrl: './producto-listar.component.css'
})
export class ProductoListarComponent {

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
