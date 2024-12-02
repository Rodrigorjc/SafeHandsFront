import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {ProductoService} from '../services/producto.service';
import {ProveedorService} from '../services/proveedor.service';
import {AcontecimientoService} from '../services/acontecimiento.service';

interface Product {
  nombre: string;
  url: string;
  precio: number;
  descripcion: string;

}
@Component({
  selector: 'app-home-proveedor',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './home-proveedor.component.html',
  styleUrl: './home-proveedor.component.css'
})
export class HomeProveedorComponent implements OnInit {
  products: Product[] = [];
  productoId: string | null = null;
  proveedor: any = {};
  proveedorId: string | null = null
  acontecimientos: any[] = [];

  currentSlideProducts = 0;
  currentSlideAcontecimientos = 0;

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private proveedorService: ProveedorService,
    private router: Router,
    private acontecimientoService: AcontecimientoService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    // this.proveedorId = this.route.snapshot.paramMap.get('id');
    let userId: string | null = localStorage.getItem('userId');
    this.proveedorId = userId;
    if (this.proveedorId) {
      this.getProveedorDetalles(this.proveedorId);
      console.log('Proveedor ID:', this.proveedorId);
    }
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
    if (window.innerWidth>768) {
      setInterval(() => {
        this.nextSlideProducts();
        this.nextSlideAcontecimientos();
      }, 5000);
    }
  }

  loadProducts(): void {
    this.productoId = localStorage.getItem('userId');
    if (this.productoId) {
      this.productoService.obtenerProductoId(this.productoId).subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => console.error('Error fetching products', err)
      });
    }
  }

  getRandomProducts(): Product[] {
    const shuffled = this.products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }

  getProveedorDetalles(id: string): void {
    this.proveedorService.getProveedor(id).subscribe({
      next: (data) => {
        this.proveedor = data;
        console.log('Proveedor details:', data);
      },
      error: (err) => {
        console.error('Error fetching proveedor details', err);
      }
    });
  }


  prevSlideProducts() {
    const totalSlides = this.getRandomProducts().length;
    this.currentSlideProducts = (this.currentSlideProducts === 0) ? totalSlides - 1 : this.currentSlideProducts - 1;
    this.updateCarousel('.carousel-products', this.currentSlideProducts);
  }

  nextSlideProducts() {
    const totalSlides = this.getRandomProducts().length;
    this.currentSlideProducts = (this.currentSlideProducts === totalSlides - 1) ? 0 : this.currentSlideProducts + 1;
    this.updateCarousel('.carousel-products', this.currentSlideProducts);
  }

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


  navegarHaciaProductos() {
    this.router.navigate(['/proveedor/productos', this.proveedor.idUsuario]);
  }



}
