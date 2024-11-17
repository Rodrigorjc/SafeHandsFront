import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {NgIf} from '@angular/common';

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
export class RegisterComponent {
  user = { username: '', password: '', email: '', repeatPassword:'' , dni:''};
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onRegister() {
    this.authService.register(this.user).subscribe(response => {
      console.log("Usuario registrado", response);
    });
  }
}
