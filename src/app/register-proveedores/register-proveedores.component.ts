import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register-proveedores',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule
  ],
  templateUrl: './register-proveedores.component.html',
  styleUrl: './register-proveedores.component.css'
})
export class RegisterProveedoresComponent {
  currentStep = 1; // Paso actual
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(9)]],
    });
  }

  nextStep() {
    if (this.registerForm.valid || this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulario enviado:', this.registerForm.value);
      alert('¡Registro completado!');
    }
  }
}
