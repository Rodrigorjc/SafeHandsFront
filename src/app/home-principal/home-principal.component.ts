import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgStyle} from '@angular/common';

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

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
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
}
