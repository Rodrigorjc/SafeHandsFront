import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {AuthService} from '../services/auth.service';
import {Cliente} from '../modelos/Cliente';
import {UploadImgComponent} from '../upload-img/upload-img.component';
import {FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { OngService } from '../services/ong.service';

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
  perfilFormOng!: FormGroup;
  ong: any|null = null;

  constructor(private service: AuthService, private fb: FormBuilder, private ongService: OngService) {
  }

  ngOnInit(): void {
    this.getRol();
    if(this.rol === 'CLIENTE'){
    this.getCliente(this.numberId);}
    this.perfilForm = this.fb.group({
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });
    if (this.rol === 'ONG') {
    this.getOng(this.numberId);}
    this.perfilFormOng = this.fb.group({
      sede: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      img: [''],
      numVoluntarios: ['', Validators.required]
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
          dni: this.ong.dni,
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

  getOng(id: number) {
    this.ongService.getIdOngPorIdUsuario(id).subscribe({
      next: (data) => {
        this.ong = data;
        this.perfilFormOng.patchValue({
          sede: this.ong.sede,
          email: this.ong.email,
          username: this.ong.username,
          descripcion: this.ong.descripcion,
          ubicacion: this.ong.ubicacion,
          img: this.ong.img,
          numVoluntarios: this.ong.numVoluntarios
        });
      },
      error: (err) => {
        console.error('Error fetching ong details', err);
        alert(`Error fetching ong details: ${err.message}`);
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
    if (this.perfilFormOng.valid) {
      console.log(this.perfilFormOng.value);
    }
  }
}
