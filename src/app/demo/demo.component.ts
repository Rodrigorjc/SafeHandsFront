import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UploadImgComponent} from '../upload-img/upload-img.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UploadImgComponent,
    NgIf
  ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {


  onDemoButtonClick() {
    this.http.get('http://localhost:8081/demo').subscribe(
      data => console.log('Data:', data),
      error => console.error('Error:', error)
    );
  }

  onGetRemainingTimeClick() {


    this.http.get('http://localhost:8081/demo/remaining-time').subscribe(
      (data: any) => console.log('Remaining Time:', data),
      error => console.error('Error:', error)
    );
  }

  myForm: FormGroup;
  imageUrl: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private http: HttpClient) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
    });
  }

  onImageUploaded(imageUrl: string) {
    this.imageUrl = imageUrl;
    console.log('URL de la imagen recibida:', imageUrl);
  }

  onSubmit() {
    const formData = {
      ...this.myForm.value,
      imageUrl: this.imageUrl, // Incluir la URL de la imagen
    };

    console.log('Datos del formulario:', formData);

    // Simula un mensaje de éxito
    alert('Formulario enviado con éxito. Revisa la consola para ver los datos.');
  }
}
