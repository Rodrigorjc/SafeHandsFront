import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Acontecimineto} from '../modelos/Acontecimineto';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-eventos-activos',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './eventos-activos.component.html',
  styleUrl: './eventos-activos.component.css'
})
export class EventosActivosComponent implements OnInit{
  currentSlide = 0;
  acontecimientos: Acontecimineto[] = [];
  nombre?:string;
  descripcion?:string;
  img?:string;
  ubicacion?:string;

  constructor(private service: AcontecimientoService, private router:Router) {
  }


  ngOnInit(): void {
   this.getAcontecimientos();
  }

  // Cambia al siguiente slide
  nextSlide() {
    const maxSlide = (this.acontecimientos.length / 4) - 1;
    if (this.currentSlide < maxSlide) {
      this.currentSlide++;
    }
  }

  // Cambia al slide anterior
  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  getAcontecimientos() {
    return this.service.getAcontecimiento().subscribe({
      next: (data: Acontecimineto[]) => {
        this.acontecimientos = data;
      },
      error: (error) => {
        console.error('Error cambio de informacion', error);
      }
    });
  }
}
