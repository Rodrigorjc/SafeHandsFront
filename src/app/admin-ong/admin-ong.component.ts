import {Component, OnInit} from '@angular/core';
import {OngService} from '../services/ong.service';
import {CommonModule} from '@angular/common';
import {AdminService} from '../services/admin.service';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UploadImgComponent} from '../upload-img/upload-img.component';

interface Ong {
  id: number;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  img: string;
  numVoluntarios: number;
  sede: string;
  email: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-admin-ong',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UploadImgComponent],
  templateUrl: './admin-ong.component.html',
  styleUrl: './admin-ong.component.css'
})
export class AdminOngComponent implements OnInit {

  ongs: Ong[] = [];
  ongForm: FormGroup;
  showForm: boolean = false;
  imageUrl: string | null = null;



  constructor(private ongService: OngService, private adminService: AdminService, private fb: FormBuilder) {
    this.ongForm = this.fb.group({
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      img: [''],
      numVoluntarios: ['', Validators.required],
      sede: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.listarOngs();
  }

  listarOngs()  {
    this.ongService.listarOngs().subscribe({
      next: (data) => {
        this.ongs = data;
      },
      error: (err) => {
        console.error('Error fetching ONGs', err);
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
        this.eliminarOng(id);
      }
    });
  }

  onImageUploaded(imageUrl: string) {
    this.imageUrl = imageUrl;
    console.log('URL de la imagen recibida:', imageUrl);
  }


  eliminarOng(ongId: any) {
    this.adminService.eliminarOng(ongId).subscribe({
      next: () => {
        this.ongs = this.ongs.filter(ong => ong.id !== ongId);
      },
      error: (err:any) => {
        console.error('Error deleting ONG', err);
      }
    });
  }
  toggleForm(){
    this.showForm = !this.showForm;
  }



  anyadirOng() {
    if (this.ongForm.invalid) {
      return;
    }

    this.ongService.crearOng(this.ongForm.value).subscribe({
      next: (createdOng: Ong) => {
        this.ongs.push(createdOng);
        this.ongForm.reset();
        this.showForm = false;
        Swal.fire('Éxito', 'ONG creada exitosamente', 'success');
      },
      error: (err: any) => {
        console.error('Error creating ONG', err);
        Swal.fire('Error', 'Error creando ONG', 'error');
      }
    });



  }


}
