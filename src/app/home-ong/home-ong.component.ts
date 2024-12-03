import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {OngService} from '../services/ong.service';
import {NgForOf, NgIf} from '@angular/common';
import {ProveedorService} from '../services/proveedor.service';

@Component({
  selector: 'app-home-ong',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './home-ong.component.html',
  styleUrl: './home-ong.component.css'
})
export class HomeONGComponent implements OnInit {
  ong: any = {};
  acontecimientos: any[] = [];
  ongId: string | null = null;
  proveedores: any[] = [];

  //contador para los slides dl carousel
  currentSlideAcontecimientos = 0;
  currentSlideProveedores = 0;

  constructor(
    private router: Router,
    private acontecimientoService: AcontecimientoService,
    private route: ActivatedRoute,
    private ongService: OngService,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    this.ongId = localStorage.getItem('userId');
    if (this.ongId) {
      this.ongService.getOngById(this.ongId).subscribe({
        next: (data) => {
          this.ong = data;
          console.log('ONG:', data);
        },
        error: (err) => {
          console.error('Error fetching ONG details', err);
          alert(`Error fetching ONG details: ${err.message}`);
        }
      });
      this.acontecimientoService.getAcontecimiento().subscribe({
        next: (data) => {
          this.acontecimientos = data;
          console.log('Acontecimientos:', data);
        },
        error: (err) => {
          console.error('Error fetching acontecimientos', err);
          alert(`Error fetching acontecimientos: ${err.message}`);
        }
      });
      this.proveedorService.getListarProveedores().subscribe({
        next: (data) => {
          this.proveedores = data;
          console.log('Proveedores:', data);
        },
        error: (err) => {
          console.error('Error fetching proveedores', err);
          alert(`Error fetching proveedores: ${err.message}`);
        }
      });
      if (window.innerWidth > 768) {
        setInterval(() => {
          this.nextSlideAcontecimientos();
          this.nextSlideProveedores();
        }, 25000);
      }
    }
  }

  // getRandomAcontecimientos() {
  //   const shuffled = this.acontecimientos.sort(() => 0.5 - Math.random());
  //   return shuffled.slice(0, 4);
  // }

  prevSlideAcontecimientos() {
    const totalSlidesA = this.acontecimientos.length;
    this.currentSlideAcontecimientos = (this.currentSlideAcontecimientos === 0) ? totalSlidesA - 1 : this.currentSlideAcontecimientos - 1;
    this.updateCarousel('.carousel-acontecimientos', this.currentSlideAcontecimientos);
  }

  nextSlideAcontecimientos() {
    const totalSlidesA = this.acontecimientos.length;
    this.currentSlideAcontecimientos = (this.currentSlideAcontecimientos === totalSlidesA - 1) ? 0 : this.currentSlideAcontecimientos + 1;
    this.updateCarousel('.carousel-acontecimientos', this.currentSlideAcontecimientos);
  }

  updateCarousel(selector: string, currentSlide: number) {
    const carousel = document.querySelector(selector);
    if (carousel) {
      carousel.scrollTo({
        left: currentSlide * carousel.clientWidth,
        behavior: 'smooth'
      });
    }
  }

  navegarAsociarAcontecimientos() {
    this.router.navigate(['/ong/acontecimientos/']);
  }

  navegarValidarProveedor() {
    this.router.navigate(['/ong/validar/proveedor/']);
  }

  prevSlideProveedores() {
    const totalSlidesP = this.proveedores.length;
    this.currentSlideProveedores = (this.currentSlideProveedores === 0) ? totalSlidesP - 1 : this.currentSlideProveedores - 1;
    this.updateCarousel('.carousel-proveedores', this.currentSlideProveedores);
  }

  nextSlideProveedores() {
    const totalSlidesP = this.proveedores.length;
    this.currentSlideProveedores = (this.currentSlideProveedores === totalSlidesP - 1) ? 0 : this.currentSlideProveedores + 1;
    this.updateCarousel('.carousel-proveedores', this.currentSlideProveedores);
  }



}
