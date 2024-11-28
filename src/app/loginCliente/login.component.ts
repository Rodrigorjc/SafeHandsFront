import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import {NgIf} from '@angular/common';
import {ActualizarHeaderService} from '../services/actualizar-header.service';

interface CustomJwtPayload {
  userId: string;
  rol: string;
}

@Component({
  selector: 'app-loginCliente',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private actualizar: ActualizarHeaderService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {}

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      localStorage.clear();
      this.authService.login(loginData).subscribe({
        next: (respuesta) => {
          if (respuesta.token != null) {
            const tokenUser = respuesta.token;
            const decodeToken = jwtDecode<CustomJwtPayload>(tokenUser);
            const userId = decodeToken.userId;
            const role = decodeToken.rol;
            localStorage.setItem('token', respuesta.token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('rol', role);
            localStorage.setItem('username', loginData.username);
            this.actualizar.triggerRefreshHeader();
            if (role === "PROVEEDOR") {
              this.router.navigate(['homeProveedor']);
            } else if (role === "CLIENTE") {
              this.router.navigate(['home']);
            } else if (role === "ONG") {
              this.router.navigate(['homeONG']);
            }
          }
        },
        error: (e) => console.error(e),
      });
    } else {
      this.errorMessage = 'Please complete all required fields.';
    }
  }
}
