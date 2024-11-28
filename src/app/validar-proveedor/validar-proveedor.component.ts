import {Component, OnInit} from '@angular/core';
import {OngService} from '../services/ong.service';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {ProveedorService} from '../services/proveedor.service';
import {ActivatedRoute} from '@angular/router';
export interface Proveedor {
  id: number;
  nombre: string;
  url: string;
  precio: number;
  descripcion: string;
  validado: boolean;
}
@Component({
  selector: 'app-validar-proveedor',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './validar-proveedor.component.html',
  styleUrl: './validar-proveedor.component.css'
})
export class ValidarProveedorComponent implements OnInit {

  proveedores: any[] = [];


  constructor(private proveedorService: ProveedorService, private ongService:OngService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.proveedorService.getListarProveedor().subscribe({
      next: (fetchedProveedores) => {
        this.proveedores = fetchedProveedores.filter((proveedor:any) => !proveedor.validado);
        console.log('Proveedores:', this.proveedores);
      },
      error: (err) => console.error('Error fetching proveedores', err)
    });
  }

  validarProveedor(proveedorId: number) {
    if (!proveedorId) {
      console.error('Proveedor ID is null or undefined');
      return;
    }

    this.ongService.validarProveedor(proveedorId).subscribe({
      next: (response) => {
        console.log('Proveedor validated successfully', response);
        this.proveedores = this.proveedores.map(proveedor =>
          proveedor.id === proveedorId ? { ...proveedor, validado: true } : proveedor
        );
      },
      error: (err) => {
        console.error('Error validating proveedor', err);
      }
    });
  }
  eliminarProveedor(proveedorId: number) {
    if (!proveedorId) {
      console.error('Proveedor ID is null or undefined');
      return;
    }

    this.ongService.eliminarProveedor(proveedorId).subscribe({
      next: (response) => {
        console.log('Proveedor eliminado con exito', response);
        this.proveedores = this.proveedores.filter(proveedor => proveedor.id !== proveedorId);
      },
      error: (err) => {
        console.error('Error deleting proveedor', err);
      }
    });
  }
}
// validarProveedor(proveedorId: string) {
//   this.ongService.validarProveedor(proveedorId).subscribe({
//     next: () => {
//       this.proveedores = this.proveedores.filter(proveedor => proveedor.id !== proveedorId);
//     },
//     error: (err) => console.error('Error validating proveedor', err)
//   });
// }
// }
