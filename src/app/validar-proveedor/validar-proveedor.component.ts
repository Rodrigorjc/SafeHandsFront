import {Component, OnInit} from '@angular/core';
import {OngService} from '../services/ong.service';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {ProveedorService} from '../services/proveedor.service';
interface Proveedor {
  id: string;
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
    CurrencyPipe,
    CommonModule
  ],
  templateUrl: './validar-proveedor.component.html',
  styleUrl: './validar-proveedor.component.css'
})
export class ValidarProveedorComponent implements OnInit {

  proveedores: Proveedor[] = [];

  constructor(private proveedorService: ProveedorService, private ongService:OngService) {}

  ngOnInit() {
    this.proveedorService.getListarProveedores().subscribe({
      next: (fetchedProveedores) => {
        this.proveedores = fetchedProveedores.filter((proveedor: Proveedor) => !proveedor.validado);
      },
      error: (err) => console.error('Error fetching proveedores', err)
    });
  }

  validarProveedor(proveedorId: string) {
    this.ongService.validarProveedor(proveedorId).subscribe({
      next: () => {
        this.proveedores = this.proveedores.filter(proveedor => proveedor.id !== proveedorId);
      },
      error: (err) => console.error('Error validating proveedor', err)
    });
  }
}
