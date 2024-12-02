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
  acontecimientos: Acontecimineto[] = [];

  constructor( private service: AcontecimientoService, private routes: Router) {}

  ngOnInit() {
    this.listado();
  }

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
