import {Component, EventEmitter, Output} from '@angular/core';
import {CloudinaryService} from '../services/cloudinary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-img',
  standalone: true,
  imports: [

  ],
  templateUrl: './upload-img.component.html',
  styleUrl: './upload-img.component.css'
})
export class UploadImgComponent {
  @Output() imageUploaded = new EventEmitter<string>(); // Evento para el padre
  imageUrl: string | null = null;

  constructor(private cloudinaryService: CloudinaryService) {}

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      Swal.fire({
        title: 'Subiendo imagen...',
        text: 'Por favor, espera un momento.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading(); // Activa el spinner
        }
      });

      try {
        this.imageUrl = await this.cloudinaryService.uploadImage(file);
        console.log('Imagen subida con éxito:', this.imageUrl);
        this.imageUploaded.emit(this.imageUrl); // Emitir la URL al componente padre
        Swal.fire({
          icon: 'success',
          title: 'Imagen subida',
          text: 'La imagen se ha subido correctamente.',
          confirmButtonText: 'Cerrar'
        });
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al subir la imagen',
          text: 'Hubo un problema al subir la imagen. Por favor, inténtalo nuevamente.',
          confirmButtonText: 'Cerrar'
        });
      }
    }
  }
}
