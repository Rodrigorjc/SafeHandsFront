import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Acontecimineto } from '../modelos/Acontecimineto';
import { AcontecimientoService } from '../services/acontecimiento.service';
import { Router } from '@angular/router';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-eventos-activos',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './eventos-activos.component.html',
  styleUrls: ['./eventos-activos.component.css']
})
export class EventosActivosComponent implements OnInit, AfterViewInit {
  @ViewChild('slider', { static: true }) slider!: ElementRef;
  currentSlide = 0;
  acontecimientos: Acontecimineto[] = [];
  slidesToShow = 1;
  maxSlide = 0;

  constructor(private service: AcontecimientoService, private router: Router) { }

  ngOnInit(): void {
    this.getAcontecimientos();
    this.updateSlidesToShow();
  }

  ngAfterViewInit(): void {
    if (this.slider) {
      const hammer = new Hammer.Manager(this.slider.nativeElement);
      hammer.on('swipeleft', () => this.nextSlide());
      hammer.on('swiperight', () => this.prevSlide());
    }
    this.updateSliderPosition();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSlidesToShow();
    this.updateSliderPosition();
  }

  updateSlidesToShow() {
    const width = window.innerWidth;
    if (width >= 1280) {
      this.slidesToShow = 5;
    } else if (width >= 1024) {
      this.slidesToShow = 4;
    } else if (width >= 768) {
      this.slidesToShow = 3;
    } else if (width >= 640) {
      this.slidesToShow = 2;
    } else {
      this.slidesToShow = 1;
    }
    this.maxSlide = Math.ceil(this.acontecimientos.length / this.slidesToShow) - 1;
  }

  nextSlide() {
    if (this.currentSlide < this.maxSlide) {
      this.currentSlide++;
      this.updateSliderPosition();
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSliderPosition();
    }
  }

  updateSliderPosition() {
    const sliderElement = this.slider.nativeElement;
    const slideWidth = sliderElement.offsetWidth / this.slidesToShow;
    sliderElement.scrollLeft = this.currentSlide * slideWidth;
  }

  getAcontecimientos() {
    return this.service.getAcontecimiento().subscribe({
      next: (data: Acontecimineto[]) => {
        this.acontecimientos = data;
        this.updateSlidesToShow();
      },
      error: (error) => {
        console.error('Error cambio de informacion', error);
      }
    });
  }
}
