import {Component, OnInit} from '@angular/core';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {Router} from '@angular/router';
import {Acontecimineto} from '../modelos/Acontecimineto';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-list-aconteciminetos',
  imports: [
    NgForOf
  ],
  templateUrl: './list-aconteciminetos.component.html',
  standalone: true,
  styleUrl: './list-aconteciminetos.component.css'
})
export class ListAconteciminetosComponent implements OnInit{
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
