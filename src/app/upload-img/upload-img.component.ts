import {Component, EventEmitter, Output} from '@angular/core';
import {CloudinaryService} from '../services/cloudinary.service';
import {NgIf} from '@angular/common';

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
      try {
        this.imageUrl = await this.cloudinaryService.uploadImage(file);
        console.log('Imagen subida con éxito:', this.imageUrl);
        this.imageUploaded.emit(this.imageUrl); // Emitir la URL al componente padre
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      }
    }
  }
}
