import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductoService } from '../services/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    HeaderComponent,
    // FooterComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './productos-proveedor.component.html',
  styleUrl: './productos-proveedor.component.css'
})
export class ProductosProveedorComponent implements OnInit {
  products: Product[] = [];
  showForm: boolean = false;
  newProduct: Product = { nombre: '', url: '' , descripcion: '', precio: 0};

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.obtenerProductos().subscribe({
      next: (fetchedProducts) => {
        this.products = fetchedProducts;
      },
      error: (err) => console.error('Error fetching products', err)
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addProduct() {
    this.productoService.crearProducto(this.newProduct).subscribe({
      next: (createdProduct) => {
        this.products.push(createdProduct);
        this.newProduct = { nombre: '', url: '', descripcion: '', precio: 0 };
        this.showForm = false;
      },
      error: (err) => console.error('Error creating product', err)
    });
  }
}
