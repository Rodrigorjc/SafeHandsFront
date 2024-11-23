import { Component, OnInit, HostListener } from '@angular/core';
import { ProveedorService } from '../services/proveedor.service';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-sliderproveedores',
  standalone: true,
  imports: [
    NgForOf,
  ],
  templateUrl: './sliderproveedores.component.html',
  styleUrls: ['./sliderproveedores.component.css']
})
export class SliderproveedoresComponent implements OnInit {
  proveedores: any[] = [];
  currentSlide = 0;
  slidesToShow = 1;

  constructor(private service: ProveedorService, private router: Router) {}

  ngOnInit(): void {
    this.getProveedores();
    this.updateSlidesToShow();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSlidesToShow();
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
    const maxSlide = this.proveedores.length - 1;
    if (this.currentSlide < maxSlide) {
      this.currentSlide++;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  getProveedores() {
    return this.service.getListadoProveedores().subscribe({
      next: (data: any[]) => {
        this.proveedores = data.map(item => ({
          nombre: item.nombre,
          id: item.id,
          img: item.img
        }));
      },
      error: (error) => {
        console.error('Error cambio de informacion', error);
      }
    });
  }
}
