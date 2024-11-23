import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {LineaPedidoService} from '../services/linea-pedido.service';
import {Acontecimineto} from '../modelos/Acontecimineto';

@Component({
  selector: 'app-info-donaciones',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './info-donaciones.component.html',
  styleUrl: './info-donaciones.component.css'
})
export class InfoDonacionesComponent implements OnInit{
  totalDonaciones: number = 0;

  constructor(private service: LineaPedidoService,private router: Router) {}

  ngOnInit() {
    this.getTotal();
  }

  redireccion() {
    this.router.navigate(['/listado/aconteciminetos']);
  }

  getTotal(){
    return this.service.getTotal().subscribe({
      next: (response: any) => {
        this.totalDonaciones = response.total;
        console.log('Total:', response.total);
      },
      error: (error) => {
        console.error('Error', error);
      }
    });
  }
}
