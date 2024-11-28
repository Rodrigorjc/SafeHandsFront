import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadImgComponent } from '../upload-img/upload-img.component';
import { CommonModule, NgIf } from '@angular/common';
import { NotificacionService } from '../services/notificacion.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UploadImgComponent,
    NgIf,
    CommonModule
  ],
  providers: [NotificacionService],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {
  myForm: FormGroup;
  imageUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private notificacion: NotificacionService
  ) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  showNotification() {
    this.notificacion.showNotification('This is a demo notification!');
  }

  onImageUploaded(imageUrl: string) {
    this.imageUrl = imageUrl;
    console.log('URL de la imagen recibida:', imageUrl);
  }

  onSubmit() {
    const formData = {
      ...this.myForm.value,
      imageUrl: this.imageUrl,
    };

    console.log('Datos del formulario:', formData);
    alert('Formulario enviado con éxito. Revisa la consola para ver los datos.');
  }

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
}
