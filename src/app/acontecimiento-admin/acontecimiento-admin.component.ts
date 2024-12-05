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
  /**
   * Acontecimiento que estamos editando.
   * Inicializado con un objeto vacío utilizando el método `crearAcontecimientoVacio`.
   */
    acontecimientoActual: Acontecimiento = this.crearAcontecimientoVacio();


  /**
   * Array para almacenar la lista de Ongs simuladas.
   */
    ongs: Ong[] = [];

  /**
   * Constructor para AcontecimientoAdminComponent.
   *
   * @param {AcontecimientoService} acontecimientoService - El servicio para interactuar con la API de Acontecimiento.
   * @param {OngService} ongService - El servicio para interactuar con la API de Ong.
   */
    constructor(private acontecimientoService: AcontecimientoService,
                private ongService: OngService) {}

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Se suscribe al AcontecimientoService para obtener los datos de los acontecimientos y asignarlos al array de ongs.
   * Registra un mensaje de error si la obtención de datos falla.
   */
  ngOnInit(): void {
    this.acontecimientoService.getAcontecimiento().subscribe({
      next: (acontecimientos) => {
        this.ongs = this.ongs
        console.log('Acontecimientos cargados', acontecimientos);
      },
      error: (err) => console.error('Error al cargar los acontecimientos', err),
    });
  }

  /**
   * Crea un objeto Acontecimiento vacío.
   *
   * Este método inicializa un nuevo objeto Acontecimiento con valores predeterminados.
   * Es útil para inicializar formularios o restablecer el estado del componente.
   *
   * @returns {Acontecimiento} Un objeto Acontecimiento vacío con los siguientes valores:
   * - id: null
   * - nombre: una cadena vacía
   * - descripcion: una cadena vacía
   * - ubicacion: una cadena vacía
   * - img: una cadena vacía
   * - idOng: 0
   */
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
  // guardarAcontecimiento(): void {
  //   this.acontecimientoService.crearAcontecimiento(this.acontecimientoActual).subscribe({
  //     next: (acontecimiento) => {
  //       Swal.fire('Éxito', 'Acontecimiento creado exitosamente', 'success');
  //
  //     },
  //     error: (err) => console.error('Error al guardar el acontecimiento', err),
  //   });
  //
  // }

  // editar un acontecimiento
}
