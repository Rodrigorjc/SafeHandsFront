import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LineaPedidoService } from '../services/linea-pedido.service';
import {NgClass, NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-home-principal',
  templateUrl: './home-principal.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgStyle
  ],
  styleUrls: ['./home-principal.component.css']
})
export class HomePrincipalComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  slides = [1, 2, 3];
  intervalId: any;
  personsHelped = 0;
  placesHelped = 0;
  totalDonaciones: number = 0;
  product = 0;
  donacion = 0;

  private targetPersons = 1350;
  private targetPlaces = 330;
  private targetProduct = 3810;

  constructor(private router: Router, private service: LineaPedidoService) {}

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
    this.animateNumbers('personsHelped', this.targetPersons, 50);
    this.animateNumbers('placesHelped', this.targetPlaces, 30);
    this.animateNumbers('product', this.targetProduct, 30);
    this.getTotal();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.slides.length - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide < this.slides.length - 1) ? this.currentSlide + 1 : 0;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  animateNumbers(property: 'personsHelped' | 'placesHelped' | 'product' | 'donacion' | 'totalDonaciones', target: number, speed: number) {
    const increment = Math.ceil(target / 100); // Incremento gradual.
    const interval = setInterval(() => {
      if (this[property as keyof HomePrincipalComponent] < target) {
        this[property as keyof HomePrincipalComponent] += increment;
        if (this[property as keyof HomePrincipalComponent] > target) {
          this[property as keyof HomePrincipalComponent] = target; // Asegurar que no pase el valor objetivo.
        }
      } else {
        clearInterval(interval); // Detener la animación al llegar al objetivo.
      }
    }, speed);
  }

  register() {
    this.router.navigate(['/register']);
  }

  proveedores() {
    this.router.navigate(['/listado/proveedores']);
  }

  getTotal() {
    this.service.getTotal().subscribe({
      next: (response: any) => {
        this.totalDonaciones = response.total;
        this.animateNumbers('totalDonaciones', this.totalDonaciones, 30);
      },
      error: (error) => {
        console.error('Error', error);
      }
    });
  }
}
