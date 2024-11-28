import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AcontecimientoService} from '../services/acontecimiento.service';

@Component({
  selector: 'app-acontecimiento-detalles',
  imports: [],
  templateUrl: './acontecimiento-detalles.component.html',
  styleUrl: './acontecimiento-detalles.component.css'
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
    }
  }

}
