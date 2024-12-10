import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  VincularAcontecimientoProductosComponent
} from '../vincular-acontecimiento-productos/vincular-acontecimiento-productos.component';
import Swal from 'sweetalert2';
import {UploadImgComponent} from '../upload-img/upload-img.component';
export interface Product {
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
    VincularAcontecimientoProductosComponent,
    UploadImgComponent
  ],
  templateUrl: './productos-proveedor.component.html',
  styleUrl: './productos-proveedor.component.css'
})
export class ProductosProveedorComponent implements OnInit {
  products: Product[] = [];
  showForm: boolean = false;
  showCreateForm: boolean = false;
  showEditForm: boolean = false;
  filterTerm: string = '';
  sortOrder: string = 'desc';
  // productForm: FormGroup;
  createProductForm: FormGroup;
  editProductForm: FormGroup;
  productoId: string | null = null;
  alertMessage: string | null = null;
  successMessage: string | null = null
  imageUrl: string | null = null;
  userId: any | null = null;

  @ViewChild('productFormElement') productFormElement!: ElementRef;


  constructor(private productoService: ProductoService, private fb: FormBuilder,) {
    this.createProductForm = this.fb.group({
      nombre: ['', Validators.required],
      url: this.imageUrl ?? '',
      precio: [0, [Validators.required, Validators.min(0.01)]],
      descripcion: ['', Validators.required]
    });

    this.editProductForm = this.fb.group({
      nombre: ['', Validators.required],
      url: this.imageUrl ?? '',
      precio: [0, [Validators.required, Validators.min(0.01)]],
      descripcion: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadProducts();
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
  // toggleCreateForm(): void {
  //   this.showCreateForm = !this.showCreateForm;
  //   this.showEditForm = false;
  // }
  //
  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
    this.showCreateForm = false;
  }

  validateForm(form: FormGroup): boolean {
    if (form.invalid) {
      Swal.fire('El formulario es inválido. Por favor, revisa los campos.', 'error');
      return false;
    }
    return true;
  }

  createProduct(): void {
    if (!this.validateForm(this.createProductForm)) {
      return;
    }
    this.createProductForm.patchValue({ url: this.imageUrl });
    this.productoService.crearProducto(this.createProductForm.value).subscribe({
      next: (createdProduct) => {
        this.products.push(createdProduct);
        this.createProductForm.reset();
        this.showCreateForm = false;
        this.showSuccess('Producto creado exitosamente');
        Swal.fire('Éxito', 'Producto creado exitosamente', 'success');
      },
      error: (err) => {
        console.error('Error creating product', err);
        this.showAlert('Error creando producto');
        Swal.fire('Error', 'Error creando producto', 'error');
      }
    });
  }

  updateProduct(): void {
    if (!this.validateForm(this.editProductForm)) {
      return;
    }
    this.editProductForm.patchValue({ url: this.imageUrl });
    this.productoService.editarProducto(this.editProductForm.value, this.productoId).subscribe({
      next: (updatedProduct) => {
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
        this.editProductForm.reset();
        this.showEditForm = false;
        this.productoId = null;
        this.showSuccess('Producto actualizado exitosamente');
        Swal.fire('Éxito', 'Producto actualizado exitosamente', 'success');
      },
      error: (err) => {
        console.error('Error updating product', err);
        this.showAlert('Error actualizando producto');
        Swal.fire('Error', 'Error actualizando producto', 'error');
      }
    });
  }

  editProduct(product: Product) {
    this.editProductForm.patchValue(product);
    this.showEditForm = true;
    this.productoId = product.id.toString();
    this.scrollToForm();
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
        Swal.fire('Éxito', 'Producto eliminado correctamente', 'success');

      },
      error: (err) => {
        console.error('Error deleting product', err);
        Swal.fire('Error', 'Error eliminando producto', 'error');
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


  private scrollToForm() {
    setTimeout(() => {
      this.productFormElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  onImageUploaded(imageUrl: string) {
    this.imageUrl = imageUrl;
    console.log('URL de la imagen recibida:', imageUrl);
    if (this.showCreateForm) {
      this.createProductForm.patchValue({ url: imageUrl });
    } else if (this.showEditForm) {
      this.editProductForm.patchValue({ url: imageUrl });
    }
  }


}
