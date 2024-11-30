import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AcontecimientoService} from '../services/acontecimiento.service';

@Component({
  selector: 'app-acontecimiento-detalles',
  templateUrl: './acontecimiento-detalles.component.html',
  styleUrls: ['./acontecimiento-detalles.component.css']
})
export class AcontecimientoDetallesComponent implements OnInit {

  acontecimiento: any;
  acontecimientoId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private acontecimientoService: AcontecimientoService
  ) {}

  ngOnInit(): void {
    this.acontecimientoId = this.route.snapshot.paramMap.get('id');
    const idAsNumber = this.acontecimientoId ? Number(this.acontecimientoId) : null;

    if (idAsNumber !== null && !isNaN(idAsNumber)) {
      this.acontecimientoService.getAcontecimientoById(idAsNumber).subscribe({
        next: (data) => {
          this.acontecimiento = data;
        },
        error: (err) => {
          console.error('Error fetching acontecimiento details', err);
          alert(`Error fetching acontecimiento details: ${err.message}`);
        }
      });
    } else {
      console.error('Invalid acontecimientoId:', this.acontecimientoId);
      alert('Invalid acontecimiento ID provided.');
    }
  }
}
