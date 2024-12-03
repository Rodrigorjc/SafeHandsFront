import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-acontecimiento-detalles',
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  standalone: true,
  templateUrl: './acontecimiento-detalles.component.html',
  styleUrl: './acontecimiento-detalles.component.css'
})
export class AcontecimientoDetallesComponent implements OnInit {

  acontecimiento: any;
  acontecimientoId: string | null = null;
  asociados: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private acontecimientoService: AcontecimientoService
  ) {
  }

  ngOnInit(): void {
    this.acontecimientoId = this.route.snapshot.paramMap.get('id');
    if (this.acontecimientoId) {
      this.acontecimientoService.getAcontecimientoById(this.acontecimientoId).subscribe({
        next: (data) => {
          this.acontecimiento = data;
        },
        error: (err) => {
          console.error('Error fetching acontecimiento details', err);
          alert(`Error fetching acontecimiento details: ${err.message}`);
        }
      });
      this.acontecimientoService.getOngPorAcontecimiento(this.acontecimientoId).subscribe({
        next: (data) => {
          this.asociados = data;
          console.log('Asociados:', this.asociados);
        },
        error: (err) => {
          console.error('Error fetching ONGs for acontecimiento', err);
          alert(`Error fetching ONGs for acontecimiento: ${err.message}`);
        }
      });

    }

  }
}
