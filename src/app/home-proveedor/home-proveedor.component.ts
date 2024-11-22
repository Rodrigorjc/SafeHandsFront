import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {ProductoService} from '../services/producto.service';
import {ProveedorService} from '../services/proveedor.service';

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
    RouterLink,
    CurrencyPipe,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './home-proveedor.component.html',
  styleUrl: './home-proveedor.component.css'
})
export class HomeProveedorComponent {
  products: Product[] = [];
  showForm: boolean = false;
  filterTerm: string = '';
  sortOrder: string = 'desc';
  productForm: FormGroup;
  productoId: string | null = null;
  alertMessage: string | null = null;
  successMessage: string | null = null
  proveedor: any = {};
  proveedorId: string | null = null

  constructor(private productoService: ProductoService, private fb: FormBuilder, private route: ActivatedRoute, private proveedorService: ProveedorService, private router: Router) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      url: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      descripcion: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadProducts();
    this.proveedorId = this.route.snapshot.paramMap.get('id');
    if (this.proveedorId) {
      this.getProveedorDetalles(this.proveedorId);
      console.log('Proveedor ID:', this.proveedorId);
    }  }

  loadProducts(): void {
    this.productoId = this.route.snapshot.paramMap.get('id');
    if (this.productoId) {
      this.productoService.obtenerProductoId(this.productoId).subscribe({
        next: (data) => {
          this.products = data;
        },

        error: (err) => console.error('Error fetching products', err)
      });
    }
  }

  filteredProducts(): any[] {
    let filtered = this.products;

    if (this.filterTerm.trim() !== '') {
      filtered = filtered.filter(product =>
        product.nombre.toLowerCase().includes(this.filterTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => this.sortOrder === 'desc' ? b.precio - a.precio : a.precio - b.precio);
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

  currentSlide = 0;

  prevSlide() {
    const totalSlides = this.getRandomProducts().length;
    this.currentSlide = (this.currentSlide === 0) ? totalSlides - 1 : this.currentSlide - 1;
    this.updateCarousel();
  }

  nextSlide() {
    const totalSlides = this.getRandomProducts().length;
    this.currentSlide = (this.currentSlide === totalSlides - 1) ? 0 : this.currentSlide + 1;
    this.updateCarousel();
  }

  updateCarousel() {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
      carousel.scrollTo({
        left: this.currentSlide * carousel.clientWidth,
        behavior: 'smooth'
      });
    }
  }
  navigateToMovilidadProveedores() {
    this.router.navigate(['/movilidad-proveedores', this.proveedor.idUsuario]);
  }
}
