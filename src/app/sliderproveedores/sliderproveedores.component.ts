import {Component, OnInit} from '@angular/core';
import {Acontecimineto} from '../modelos/Acontecimineto';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-sliderproveedores',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './sliderproveedores.component.html',
  styleUrl: './sliderproveedores.component.css'
})
export class SliderproveedoresComponent implements OnInit{
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
