import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {Acontecimineto} from '../modelos/Acontecimineto';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-acontecimiento',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './acontecimiento.component.html',
  styleUrl: './acontecimiento.component.css'
})
export class AcontecimientoComponent {
  /**
   * Array para almacenar la lista de Acontecimientos.
   */
  acontecimientos: Acontecimineto[] = [];

  /**
   * Constructor para AcontecimientoComponent.
   *
   * @param {AcontecimientoService} service - El servicio para interactuar con la API de Acontecimiento.
   * @param {Router} routes - El Router de Angular para la navegación.
   */
  constructor( private service: AcontecimientoService, private routes: Router) {}

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Llama al metodo listado para obtener la lista de Acontecimientos.
   */
  ngOnInit() {
    this.listado();
  }

  /**
   * Obtiene la lista de Acontecimientos desde el servidor.
   * Se suscribe al AcontecimientoService para obtener los datos y asignarlos al array de acontecimientos.
   * Registra un mensaje de error si la obtención de datos falla.
   */
  listado(){
    this.service.getAcontecimiento().subscribe({
      next: (data: Acontecimineto[])=> {
        this.acontecimientos = data;
      },
      error:(error) => {
        console.error('Error al obtener datos', error);
      }
    });
  }
}
