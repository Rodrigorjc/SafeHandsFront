import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { AcontecimientoService } from '../services/acontecimiento.service';
import { OngService } from '../services/ong.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ong-asociar-acontecimiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ong-asociar-acontecimiento.component.html',
  styleUrl: './ong-asociar-acontecimiento.component.css'
})
export class OngAsociarAcontecimientoComponent implements OnInit {
  acontecimientos: any[] = [];
  asociados: any[] = [];
  noAsociados: any[] = [];
  ong: any = {};
  ongId: string | null = null;
  asociarForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private acontecimientoService: AcontecimientoService,
    private ongService: OngService,
  ) {
    this.asociarForm = this.fb.group({
      acontecimientoId: ['', Validators.required],
      ongId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.ongId = this.route.snapshot.paramMap.get('id');
    this.asociarForm.patchValue({ ongId: this.ongId });

    if (this.ongId) {
      this.acontecimientoService.getAcontecimientosByOngId(this.ongId).subscribe({
        next: (data) => {
          this.asociados = data;
          this.loadNoAsociados();
        },
        error: (err) => {
          console.error('Error fetching asociados', err);
          this.showAlert(`Error al obtener los acontecimientos asociados: ${err.message}`);
        }
      });
    }
  }

  loadNoAsociados() {
    this.acontecimientoService.getAcontecimiento().subscribe({
      next: (data) => {
        this.noAsociados = data.filter(acontecimiento =>
          !this.asociados.some(asociado => asociado.id === acontecimiento.id)
        );
      },
      error: (err) => {
        console.error('Error fetching no asociados', err);
        this.showAlert(`Error al obtener los acontecimientos no asociados: ${err.message}`);
      }
    });
  }

  asociarAcontecimiento(acontecimientoId: number) {
    if (!this.ongId) {
      this.showAlert('Falta el ID de la ONG');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres asociar este acontecimiento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, asociar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ongService.asociarAcontecimiento(acontecimientoId).subscribe(
          response => {
            console.log('Acontecimiento asociado:', response);
            this.showSuccess('Acontecimiento asociado exitosamente');
            this.ngOnInit(); // Refresh the lists
          },
          error => {
            console.error('Error al asociar acontecimiento:', error);
            this.showAlert('Error al asociar acontecimiento, el evento ya está asociado a esta ONG');
          }
        );
      }
    });
  }

  eliminarAcontecimientoAsociado(acontecimientoId: number) {
    if (!this.ongId) {
      this.showAlert('Falta el ID de la ONG');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este acontecimiento asociado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ongService.eliminarAcontecimientoAsociado(Number(this.ongId), acontecimientoId).subscribe(
          response => {
            console.log('Acontecimiento eliminado:', response);
            this.showSuccess('Acontecimiento eliminado exitosamente');
            this.ngOnInit(); // Refresh the lists
          },
          error => {
            console.error('Error al eliminar acontecimiento:', error);
            this.showAlert('Error al eliminar acontecimiento');
          }
        );
      }
    });
  }

  private showAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  private showSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message,
    });
  }
}
