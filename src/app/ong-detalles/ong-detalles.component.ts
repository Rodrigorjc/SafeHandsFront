import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {ActivatedRoute} from '@angular/router';
import {CommonModule, DatePipe} from '@angular/common';
import {OngService} from '../services/ong.service';

@Component({
  selector: 'app-ong-detalles',
  standalone: true,
  imports: [
    HeaderComponent,
    DatePipe,
    CommonModule
  ],
  templateUrl: './ong-detalles.component.html',
  styleUrl: './ong-detalles.component.css'
})
export class OngDetallesComponent implements OnInit {
  acontecimientos: any[] = [];
  ong: any = {};
  ongId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private acontecimientoService: AcontecimientoService,
    private ongService: OngService,
  ) {}

  ngOnInit() {
    this.ongId = this.route.snapshot.paramMap.get('id');
    if (this.ongId) {
      this.ongService.getOngById(this.ongId).subscribe({
        next: (data) => {
          this.ong = data;
        },
        error: (err) => {
          console.error('Error fetching ONG details', err);
          alert(`Error fetching ONG details: ${err.message}`);
        }
      });
      this.acontecimientoService.getAcontecimientosByOngId(this.ongId).subscribe({
        next: (data) => {
          this.acontecimientos = data;
        },
        error: (err) => {
          console.error('Error fetching acontecimientos', err);
          alert(`Error fetching acontecimientos: ${err.message}`);
        }
      });

    }
  }
}





