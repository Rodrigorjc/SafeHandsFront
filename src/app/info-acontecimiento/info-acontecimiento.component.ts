import {Component, OnInit} from '@angular/core';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Acontecimineto} from '../modelos/Acontecimineto';

@Component({
  selector: 'app-info-acontecimiento',
  imports: [
  ],
  templateUrl: './info-acontecimiento.component.html',
  standalone: true,
  styleUrl: './info-acontecimiento.component.css'
})
export class InfoAcontecimientoComponent implements OnInit{
  acontecimineto: Acontecimineto = {} as Acontecimineto;

  constructor(private service: AcontecimientoService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const  id = +params['id'];
      this.cagarDatos(id);
    });
  }

  cagarDatos(id: number) {
    this.service.getAcontecimientoById(id).subscribe({
      next: (data: Acontecimineto)=> {
        this.acontecimineto = data;
      },
      error:(error) => {
        console.error('Error al obtener datos', error);
      }
    });
  }
}
