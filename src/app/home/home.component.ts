import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AcontecimientoService } from '../services/acontecimiento.service';
import { Acontecimineto } from '../modelos/Acontecimineto';
import {NgForOf} from '@angular/common';
import {EventosActivosComponent} from '../eventos-activos/eventos-activos.component';
import {SliderproveedoresComponent} from '../sliderproveedores/sliderproveedores.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    NgForOf,
    EventosActivosComponent,
    SliderproveedoresComponent
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('slider', { static: true }) slider!: ElementRef;
  acontecimientos: Acontecimineto[] = [];
  currentSlide = 0;
  slidesToShow = 1;

  constructor(private service: AcontecimientoService) {}

  ngOnInit(): void {
    this.getAcontecimientos();
    this.updateSlidesToShow();
  }

  ngAfterViewInit(): void {
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
  }

  nextSlide() {
    const maxSlide = this.acontecimientos.length - this.slidesToShow;
    if (this.currentSlide < maxSlide) {
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
