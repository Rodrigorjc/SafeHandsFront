import {Component, OnInit} from '@angular/core';
import {OngService} from '../services/ong.service';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {ProveedorService} from '../services/proveedor.service';
interface Proveedor {
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





  constructor(private proveedorService: ProveedorService, private ongService:OngService) {}

  ngOnInit() {
    this.proveedorService.getListarProveedores().subscribe({
      next: (fetchedProveedores) => {
        this.proveedores = fetchedProveedores.filter((proveedor:any) => !proveedor.validado);
      },
      error: (err) => console.error('Error fetching proveedores', err)
    });
  }

  validarProveedor(proveedorId: number) {
    if (proveedorId) {
      this.ongService.validarProveedor(proveedorId).subscribe(
        response => {
          console.log('Proveedor validado:', response);
        },
        error => {
          console.error('Error al validar proveedor:', error);
        }
      );
    } else {
      console.error('Proveedor ID is null or undefined');
    }
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
