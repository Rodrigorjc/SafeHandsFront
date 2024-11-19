import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {RegistroCliente} from '../modelos/RegistroCliente';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {RegistroProveedores} from '../modelos/RegistroProveedores';
import {RegisterProveedoresService} from '../services/register-proveedores.service';

@Component({
  selector: 'app-register-proveedores',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    NgClass
  ],
  templateUrl: './register-proveedores.component.html',
  styleUrl: './register-proveedores.component.css'
})
export class RegisterProveedoresComponent {
  registroProveedor: RegistroProveedores = new RegistroProveedores();
  errorMessage = '';
  numVoluntarios?:number;
  sede:string = '';
  ubicacion:string = '';
  cif:string = '';
  username:string = '';
  email:string = '';
  password:string = '';
  currentStep: number = 1;

  constructor(private registerProveedoresService: RegisterProveedoresService, private router:Router) {}

  onRegister() {
    this.rellenarDatos();
    this.registerProveedoresService.register(this.registroProveedor).subscribe({
      next:(v) => console.log(v),
      error: (e) =>console.error(e),
      complete: () =>  this.router.navigate(['/login']),
    });
  }

  rellenarDatos() {
    this.registroProveedor.numVoluntarios = this.numVoluntarios;
    this.registroProveedor.sede = this.sede;
    this.registroProveedor.ubicacion = this.ubicacion;
    this.registroProveedor.cif = this.cif;
    this.registroProveedor.email = this.email;
    this.registroProveedor.username = this.username;
    this.registroProveedor.password = this.password;
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
