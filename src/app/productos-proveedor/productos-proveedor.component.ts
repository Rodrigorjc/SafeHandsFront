import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductoService } from '../services/producto.service';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, NgForm, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

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
    ReactiveFormsModule
  ],
  templateUrl: './productos-proveedor.component.html',
  styleUrl: './productos-proveedor.component.css'
})
export class ProductosProveedorComponent implements OnInit {
  products: Product[] = [];
  showForm: boolean = false;
  newProduct: Product = { nombre: '', url: '' , descripcion: '', precio: 0};
    productForm: FormGroup;
    productoId: string | null = null;

  constructor(private productoService: ProductoService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      url: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      descripcion: ['', Validators.required]
    });
  }
  ngOnInit() {
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
        },
        error: (err) => console.error('Error creating product', err)
      });
    }
}
