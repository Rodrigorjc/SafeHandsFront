import { Component } from '@angular/core';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {CommonModule, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {OngService} from '../services/ong.service';
import Swal from 'sweetalert2';
import {Ong} from '../modelos/Ong';

interface Acontecimiento{
  id: number|null;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  img: string;

  idOng: number;
}

@Component({
  selector: 'app-acontecimiento-admin',
  imports: [
    NgForOf, CommonModule, FormsModule
  ],
  templateUrl: './acontecimiento-admin.component.html',
  standalone: true,
  styleUrl: './acontecimiento-admin.component.css'
})
export class AcontecimientoAdminComponent {
    acontecimientoActual: Acontecimiento = this.crearAcontecimientoVacio();
    //Acontecimiento que estamos editando

    //Ongs simulados
    ongs: Ong[] = [];

    constructor(private acontecimientoService: AcontecimientoService,
                private ongService: OngService) {}

  ngOnInit(): void {
    this.acontecimientoService.getAcontecimiento().subscribe({
      next: (acontecimientos) => {
        this.ongs = this.ongs
        console.log('Acontecimientos cargados', acontecimientos);
      },
      error: (err) => console.error('Error al cargar los acontecimientos', err),
    });
  }

  // Crear un acontecimiento vacío
  crearAcontecimientoVacio(): Acontecimiento {
    return {
      id: null,
      nombre: '',
      descripcion: '',
      ubicacion: '',
      img: '',
      idOng: 0
    };
  }

  // Guardar un nuevo acontecimiento
  guardarAcontecimiento(): void {
    this.acontecimientoService.crearAcontecimiento(this.acontecimientoActual).subscribe({
      next: (acontecimiento) => {
        Swal.fire('Éxito', 'Acontecimiento creado exitosamente', 'success');

      },
      error: (err) => console.error('Error al guardar el acontecimiento', err),
    });

  }

  // editar un acontecimiento
}
