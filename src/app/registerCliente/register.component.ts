import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {NgIf} from '@angular/common';
import {RegistroCliente} from '../modelos/RegistroCliente';
import {Router} from '@angular/router';
import {RegisterProveedoresService} from '../services/register-proveedores.service';

@Component({
  selector: 'app-registerCliente',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registroCliente: RegistroCliente = new RegistroCliente();
  errorMessage = '';
   dni: string = '';
   email: string = '';
   username: string = '';
   password: string = '';

  constructor(private authService: RegisterProveedoresService, private router:Router) {}

  ngOnInit() {
    this.rellenarDatos();
  }

  onRegister() {
    this.rellenarDatos();
    localStorage.removeItem('token');
    this.authService.register(this.registroCliente).subscribe({
      next:(v) => console.log(v),
      error: (e) =>console.error(e),
      complete: () =>  this.router.navigate(['/login']),
    });
  }

  rellenarDatos() {
    this.registroCliente.dni = this.dni;
    this.registroCliente.email = this.email;
    this.registroCliente.username = this.username;
    this.registroCliente.password = this.password;
  }
}
