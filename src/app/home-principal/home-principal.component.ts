import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-principal',
  imports: [
    NgClass,
    NgStyle,
    NgForOf
  ],
  templateUrl: './home-principal.component.html',
  standalone: true,
  styleUrl: './home-principal.component.css'
})
export class HomePrincipalComponent implements OnInit, OnDestroy{
  currentSlide = 0;
  slides = [1, 2, 3];
  intervalId: any;
  personsHelped = 0;
  placesHelped = 0;

  private targetPersons = 1350;
  private targetPlaces = 330;

  constructor(private router: Router) {}


  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
    this.animateNumbers('personsHelped', this.targetPersons, 50);
    this.animateNumbers('placesHelped', this.targetPlaces, 30);
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

  animateNumbers(property: 'personsHelped' | 'placesHelped', target: number, speed: number) {
    const increment = Math.ceil(target / 100); // Incremento gradual.
    const interval = setInterval(() => {
      if (this[property] < target) {
        this[property] += increment;
        if (this[property] > target) {
          this[property] = target; // Asegurar que no pase el valor objetivo.
        }
      } else {
        clearInterval(interval); // Detener la animación al llegar al objetivo.
      }
    }, speed);
  }

  register() {
    this.router.navigate(['/register'])
  }
}
