import { Component } from '@angular/core';
import {Acontecimineto} from '../modelos/Acontecimineto';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-acontecimiento-admin',
  imports: [],
  templateUrl: './acontecimiento-admin.component.html',
  standalone: true,
  styleUrl: './acontecimiento-admin.component.css'
})
export class AcontecimientoAdminComponent {
  acontecimientos: Acontecimineto[] = [];

  constructor(private service: AcontecimientoService, private router: Router) {}

  ngOnInit() {
    this.listado();
  }

  listado() {
    this.service.getAcontecimiento().subscribe({
      next: (data: Acontecimineto[]) => {
        this.acontecimientos = data;
      },
      error: (error) => {
        console.error('Error al obtener datos', error);
      }
    });
  }

  editarAcontecimiento(id: number) {
    this.router.navigate([`/admin/editar/${id}`]);
  }

  eliminarAcontecimiento(id: number) {
    this.service.eliminarAcontecimiento(id).subscribe(() => {
      this.listado();
    });
  }

  crearAcontecimiento() {
    this.router.navigate(['/admin/crear']);
  }
}
