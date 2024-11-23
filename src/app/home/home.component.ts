import {Component, OnInit} from '@angular/core';
import {DemoComponent} from '../demo/demo.component';
import {HeaderComponent} from '../header/header.component';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {NgForOf} from '@angular/common';
import {Acontecimineto} from '../modelos/Acontecimineto';
import {List} from 'postcss/lib/list';
import {Router, Routes} from '@angular/router';
import {EventosActivosComponent} from '../eventos-activos/eventos-activos.component';
import { map } from 'rxjs';
import {SliderproveedoresComponent} from '../sliderproveedores/sliderproveedores.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DemoComponent,
    HeaderComponent,
    NgForOf,
    EventosActivosComponent,
    SliderproveedoresComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  currentSlide = 0;
  acontecimientos: Acontecimineto[] = [];
  nombre?:string;
  descripcion?:string;
  img?:string;
  ubicacion?:string;

  constructor(private service: AcontecimientoService, private router:Router) {
  }

  ngOnInit() {
    this.getAcontecimientos();
  }

  getAcontecimientos() {
    return this.service.getAcontecimiento().pipe(
      map((data: Acontecimineto[]) => data.slice(0, 3))
    ).subscribe({
      next: (data: Acontecimineto[]) => {
        this.acontecimientos = data;
      },
      error: (error) => {
        console.error('Error cambio de informacion', error);
      }
    });
  }

  // Cambia al siguiente slide
  nextSlide() {
    const totalSlides = this.acontecimientos.length; // Ajusta según el número de slides
    this.currentSlide = (this.currentSlide + 1) % totalSlides;
  }

// Cambia al slide anterior
  prevSlide() {
    const totalSlides = this.acontecimientos.length; // Ajusta según el número de slides
    this.currentSlide = (this.currentSlide - 1 + totalSlides) % totalSlides;
  }
}
