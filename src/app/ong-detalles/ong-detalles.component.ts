import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {OngService} from '../services/ong.service';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-ong-detalles',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink
  ],
  templateUrl: './ong-detalles.component.html',
  styleUrl: './ong-detalles.component.css'
})
export class OngDetallesComponent implements OnInit {
  acontecimientos: any[] = [];
  ong: any = {};
  asociados: any[] = [];
  noAsociados: any[] = [];
  userId: any | null = null;
  ongId: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private acontecimientoService: AcontecimientoService,
    private ongService: OngService,
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.ongService.getIdOngPorIdUsuario(this.userId).subscribe({
        next: (ongId) => {
          this.ongId = ongId;
          this.acontecimientoService.getAcontecimientosByOngId(this.ongId).subscribe({
            next: (data) => {
              this.asociados = data;
              console.log('Acontecimientos:', data);
              console.log("ONG ID:", this.ongId);
            },
            error: (err) => {
              console.error('Error fetching acontecimientos', err);
              alert(`Error fetching acontecimientos: ${err.message}`);
            }
          });

          this.ongService.getOngById(this.userId).subscribe({
            next: (data) => {
              this.ong = data;
              console.log('ONG:', data);
            },
            error: (err) => {
              console.error('Error fetching ONG details', err);
              alert(`Error fetching ONG details: ${err.message}`);
            }
          });
        },
        error: (err) => {
          console.error('Error fetching ONG ID', err);
          alert(`Error fetching ONG ID: ${err.message}`);
        }
      });
    }
  }
}





