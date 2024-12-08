// src/app/perfil/perfil.component.ts
import { Component, OnInit } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Cliente } from '../modelos/Cliente';
import { UploadImgComponent } from '../upload-img/upload-img.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NombreImg } from '../modelos/NombreImg';

@Component({
  selector: 'app-perfil',
  imports: [
    NgIf,
    UploadImgComponent,
    FormsModule,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './perfil.component.html',
  standalone: true,
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  rol: string | null = '';
  userID: string | null = localStorage.getItem('userId');
  numberId: number = Number(this.userID);
  cliente: Cliente | null = null;
  perfilForm!: FormGroup;
  productosDonados: NombreImg[] = [];
  acontecimientosDonados: NombreImg[] = [];

  constructor(private service: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getRol();
    this.getCliente(this.numberId);
    this.getProductosDonados(this.numberId);
    this.getAcontecimientosDonados(this.numberId);
    this.perfilForm = this.fb.group({
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      const clientePerfilDTO: Cliente = {
        dni: this.perfilForm.value.dni,
        email: this.perfilForm.value.email,
        username: this.perfilForm.value.username,
        img: this.cliente?.img || ''
      };

      this.service.updateClientePerfil(this.numberId, clientePerfilDTO).subscribe({
        next: (updatedCliente) => {
          console.log('Cliente updated successfully', updatedCliente);
          Swal.fire({
            icon: 'success',
            title: 'Perfil actualizado',
            text: 'El perfil se ha actualizado correctamente.',
            confirmButtonText: 'Cerrar'
          });
        },
        error: (err) => {
          console.error('Error updating cliente', err);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el perfil',
            text: 'Hubo un problema al actualizar el perfil. Por favor, inténtalo nuevamente.',
            confirmButtonText: 'Cerrar'
          });
        }
      });
    }
  }

  getRol() {
    this.rol = localStorage.getItem('rol');
  }

  getCliente(id: number) {
    this.service.obtenerCliente(id).subscribe({
      next: (data) => {
        this.cliente = data;
        this.perfilForm.patchValue({
          dni: this.cliente.dni,
          email: this.cliente.email,
          username: this.cliente.username
        });
      },
      error: (err) => {
        console.error('Error fetching cliente details', err);
        alert(`Error fetching cliente details: ${err.message}`);
      }
    });
  }

  getProductosDonados(userId: number) {
    this.service.getProductosDonados(userId).subscribe({
      next: (data) => {
        this.productosDonados = data;
      },
      error: (err) => {
        console.error('Error fetching productos donados', err);
      }
    });
  }

  getAcontecimientosDonados(userId: number) {
    this.service.getAcontecimientosDonados(userId).subscribe({
      next: (data) => {
        this.acontecimientosDonados = data;
      },
      error: (err) => {
        console.error('Error fetching acontecimientos donados', err);
      }
    });
  }

  onImageUploaded(imageUrl: string) {
    if (this.cliente) {
      this.cliente.img = imageUrl;
    }
  }
}
