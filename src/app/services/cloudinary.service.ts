import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private cloudName = 'dnggctnlt'; // Cambia esto por tu Cloud Name
  private uploadPreset = 'safeHands'; // Configura este preset en Cloudinary

  constructor() {}

  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
        formData
      );
      return response.data.secure_url; // URL de la imagen
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error;
    }
  }
}
