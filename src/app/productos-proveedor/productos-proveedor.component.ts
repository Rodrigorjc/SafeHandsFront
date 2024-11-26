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
import Swal from 'sweetalert2';
interface Product {
  id: number;
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
  productForm: FormGroup;
  productoId: string | null = null;
  alertMessage: string | null = null;
  successMessage: string | null = null

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
        this.showSuccess('Producto creado exitosamente') ;

      },
      error: (err) => {
        console.error('Error creating product', err);
        this.showAlert('Error creando producto');
      }
    });
  }
  confirmDelete(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct(id);
      } else {
        this.showAlert('Eliminación cancelada');
      }
    });
  }

  deleteProduct(id: number){
    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id !== id);
        this.showSuccess('Producto eliminado exitosamente');
      },
      error: (err) => {
        console.error('Error deleting product', err);
        this.showAlert('Error eliminando producto');
      }
    });
  }



  private showAlert(message: string) {
    this.alertMessage = message;
    setTimeout(() => {
      this.alertMessage = null;
    }, 3000); // Clear the alert after 10 seconds
  }

  private showSuccess(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 3000); // Clear the success message after 10 seconds
}
}
