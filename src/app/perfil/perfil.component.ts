import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {AuthService} from '../services/auth.service';
import {Cliente} from '../modelos/Cliente';
import {UploadImgComponent} from '../upload-img/upload-img.component';
import {FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-perfil',
  imports: [
    NgIf,
    UploadImgComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './perfil.component.html',
  standalone: true,
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{

  rol: string | null = '';
  userID: string | null = localStorage.getItem('userId');
  numberId: number = Number(this.userID)
  cliente: Cliente | null = null;
  perfilForm!: FormGroup;

  constructor(private service: AuthService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getRol();
    this.getCliente(this.numberId);
    this.perfilForm = this.fb.group({
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });
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

  onImageUploaded(imageUrl: string) {
    if (this.cliente) {
      this.cliente.img = imageUrl;
    }
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      console.log(this.perfilForm.value);
    }
  }
}
