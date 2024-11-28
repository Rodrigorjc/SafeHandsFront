import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegistroCliente } from '../modelos/RegistroCliente';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registerCliente',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage = '';
  registroCliente: RegistroCliente = new RegistroCliente();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}[A-Z]$/)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.rellenarDatos();
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');
    return password && repeatPassword && password.value === repeatPassword.value ? null : { 'passwordMismatch': true };
  };

  onRegister() {
    if (this.registerForm.valid) {
      this.rellenarDatos();
      localStorage.removeItem('token');
      this.authService.register(this.registroCliente).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => this.router.navigate(['/login']),
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos requeridos y asegúrate de que las contraseñas coincidan.';
    }
  }

  rellenarDatos() {
    this.registroCliente.dni = this.registerForm.get('dni')?.value;
    this.registroCliente.email = this.registerForm.get('email')?.value;
    this.registroCliente.username = this.registerForm.get('username')?.value;
    this.registroCliente.password = this.registerForm.get('password')?.value;
  }
}
