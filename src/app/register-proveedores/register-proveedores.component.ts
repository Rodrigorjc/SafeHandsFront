import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {RegistroProveedores} from '../modelos/RegistroProveedores';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {RegisterProveedoresService} from '../services/register-proveedores.service';
import {UploadImgComponent} from '../upload-img/upload-img.component';

@Component({
  selector: 'app-register-proveedores',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    NgClass,
    UploadImgComponent
  ],
  templateUrl: './register-proveedores.component.html',
  styleUrl: './register-proveedores.component.css'
})
export class RegisterProveedoresComponent {
  registroProveedor: RegistroProveedores = new RegistroProveedores();
  errorMessage = '';
  imageUrl: string | null = null;
  currentStep: number = 1;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private registerProveedoresService: RegisterProveedoresService, private router:Router) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      numVoluntarios: ['', [Validators.required, Validators.min(1)]],
      sede: ['', Validators.required],
      ubicacion: ['', Validators.required],
      cif: ['', Validators.required],
      img: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const password2 = control.get('password2');
    return password && password2 && password.value === password2.value ? null : { 'passwordMismatch': true };
  };

  onImageUploaded(imageUrl: string) {
    this.imageUrl = imageUrl;
    console.log('URL de la imagen recibida:', imageUrl);
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.rellenarDatos();
      this.registerProveedoresService.register(this.registroProveedor).subscribe({
        next:(v) => console.log(v),
        error: (e) =>console.error(e),
        complete: () =>  this.router.navigate(['/login']),
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
    }
  }

  rellenarDatos() {
    this.registroProveedor.nombre = this.registerForm.get('nombre')?.value;
    this.registroProveedor.numVoluntarios = this.registerForm.get('numVoluntarios')?.value;
    this.registroProveedor.sede = this.registerForm.get('sede')?.value;
    this.registroProveedor.ubicacion = this.registerForm.get('ubicacion')?.value;
    this.registroProveedor.cif = this.registerForm.get('cif')?.value;
    this.registroProveedor.img = this.imageUrl ?? '';
    this.registroProveedor.email = this.registerForm.get('email')?.value;
    this.registroProveedor.username = this.registerForm.get('username')?.value;
    this.registroProveedor.password = this.registerForm.get('password')?.value;
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
