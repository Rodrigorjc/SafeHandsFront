import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductoService } from '../services/producto.service';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, NgForm, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {
  VincularAcontecimientoProductosComponent
} from '../vincular-acontecimiento-productos/vincular-acontecimiento-productos.component';

interface Product {
  nombre: string;
  url: string;
  precio: number;
  descripcion: string;

}

@Component({
  selector: 'app-productos-proveedor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VincularAcontecimientoProductosComponent
  ],
  templateUrl: './productos-proveedor.component.html',
  styleUrl: './productos-proveedor.component.css'
})
export class ProductosProveedorComponent implements OnInit {
  products: Product[] = [];
  showForm: boolean = false;
  filterTerm: string = '';
  sortOrder: string = 'desc';
  newProduct: Product = { nombre: '', url: '' , descripcion: '', precio: 0};
  productForm: FormGroup;
  productoId: string | null = null;
  alertMessage: string | null = null;


  constructor(private productoService: ProductoService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      url: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      descripcion: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadProducts();
  }

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
  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
  }
  clearSearch(): void {
    this.filterTerm = '';
  }

  toggleForm(){
      this.showForm = !this.showForm;
  }

  addProduct(){
    if (this.productForm.invalid) {
      return;
    }

    this.productoService.crearProducto(this.productForm.value).subscribe({
      next: (createdProduct) => {
        this.products.push(createdProduct);
        this.productForm.reset();
        this.showForm = false;
        this.alertMessage = 'Producto creado exitosamente';

      },
      error: (err) => {
        console.error('Error creating product', err);
        this.alertMessage = 'Error creando producto';
      }
    });
  }
}
