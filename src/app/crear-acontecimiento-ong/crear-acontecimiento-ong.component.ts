import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {OngService} from '../services/ong.service';
import {NgForOf, NgIf} from '@angular/common';
import {UploadImgComponent} from '../upload-img/upload-img.component';
import Swal from 'sweetalert2';
import {Product} from '../productos-proveedor/productos-proveedor.component';

@Component({
  selector: 'app-crear-acontecimiento-ong',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    UploadImgComponent
  ],
  templateUrl: './crear-acontecimiento-ong.component.html',
  styleUrl: './crear-acontecimiento-ong.component.css'
})
export class CrearAcontecimientoOngComponent implements OnInit {

  @ViewChild('productFormElement') productFormElement!: ElementRef;


  ongId: string | null = null;
  acontecimientos: any[] = [];
  acontecimientoForm: FormGroup;
  showForm: boolean = false;
  imageUrl: string | null = null;
  editProductForm: FormGroup;
  acontecimientoId: string | null = null;
  showCreateForm: boolean = false;
  showEditForm: boolean = false;



  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private acontecimientoService: AcontecimientoService,
    private ongService: OngService,
  ) {
    this.acontecimientoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      img: [''],
    });
    this.editProductForm = this.fb.group({
      nombre: ['', Validators.required],
      img: [''],
      ubicacion: [Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.ongId = localStorage.getItem('userId');
    this.acontecimientoService.getAcontecimiento().subscribe({
      next: (data) => {
        this.acontecimientos = data;
        console.log('Acontecimientos:', data);
      },
      error: (err) => {
        console.error('Error fetching acontecimientos', err);
        Swal.fire('Error', `Error fetching acontecimientos: ${err.message}`, 'error');
      }
    });
  }


  toggleForm() {
    this.showForm = !this.showForm;
  }

  validateForm(form: FormGroup): boolean {
    if (form.invalid) {
      Swal.fire('El formulario es inválido. Por favor, revisa los campos.', 'error');
      return false;
    }
    return true;
  }

  crearAcontecimiento(): void {
    if (!this.validateForm(this.acontecimientoForm)) {
      return;
    }
    this.acontecimientoForm.patchValue({ img: this.imageUrl });
    this.acontecimientoService.crearAcontecimientoOng(this.acontecimientoForm.value).subscribe({
      next: (response) => {
        console.log('Acontecimiento creado:', response);
        this.acontecimientos.push(response);
        this.acontecimientoForm.reset();
        this.showForm = false;
        Swal.fire('Éxito', 'Acontecimiento creado exitosamente', 'success').then(() => {
          location.reload(); //Para recargar la página
        });
      },
      error: (err) => {
        console.error('Error al crear acontecimiento:', err);
        Swal.fire('Error', `Error al crear acontecimiento: ${err.message}`, 'error');
      }
    });
  }

  eliminarAcontecimiento(acontecimientoId: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este acontecimiento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmarEliminacion(acontecimientoId);
      }
    });
  }

  private confirmarEliminacion(acontecimientoId: number) {
    this.acontecimientoService.eliminarAcontecimieto(acontecimientoId).subscribe({
      next: (response) => {
        this.acontecimientos = this.acontecimientos.filter(a => a.id !== acontecimientoId);
        console.log('Acontecimiento eliminado:', response);
        Swal.fire('Éxito', 'Acontecimiento eliminado exitosamente', 'success').then(() => {
          location.reload();
        });
      },
      error: (err) => {
        console.error('Error al eliminar acontecimiento:', err);
        Swal.fire('Error', `Error al eliminar acontecimiento: ${err.message}`, 'error');
      }
    });
  }

  updateAcontecimiento(): void {
    if (!this.validateForm(this.editProductForm)) {
      return;
    }
      this.editProductForm.patchValue({ img: this.imageUrl });
    this.acontecimientoService.editarAcontecimiento(this.editProductForm.value, this.acontecimientoId).subscribe({
      next: (updatedProduct) => {
        const index = this.acontecimientos.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.acontecimientos[index] = updatedProduct;
        }
        this.editProductForm.reset();
        this.showEditForm = false;
        this.acontecimientoId = null;
        Swal.fire('Éxito', 'Producto actualizado exitosamente', 'success');
      },
      error: (err) => {
        console.error('Error updating product', err);
        Swal.fire('Error', 'Error actualizando producto', 'error');
      }
    });
  }

  editAcontecimiento(product: Product) {
    this.editProductForm.patchValue(product);
    this.showEditForm = true;
    this.acontecimientoId = product.id.toString();
    this.scrollToForm();
  }
  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
    this.showCreateForm = false;
  }

  private scrollToForm() {
    setTimeout(() => {
      this.productFormElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  onImageUploaded(imageUrl: string) {
    this.imageUrl = imageUrl;
    console.log('URL de la imagen recibida:', imageUrl);
  }

}
