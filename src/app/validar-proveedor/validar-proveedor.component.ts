import {Component, OnInit} from '@angular/core';
import {OngService} from '../services/ong.service';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {ProveedorService} from '../services/proveedor.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import Swal from 'sweetalert2';
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
    CommonModule,
    RouterLink
  ],
  templateUrl: './validar-proveedor.component.html',
  styleUrl: './validar-proveedor.component.css'
})
export class ValidarProveedorComponent implements OnInit {

  proveedores: any[] = [];
  ongId: any | null = null;
  userId: any | null = null;


  constructor(private proveedorService: ProveedorService, private ongService:OngService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId= localStorage.getItem('userId');
    if(this.userId){
      this.ongService.getIdOngPorIdUsuario(this.userId).subscribe({
        next: (ongId) => {
          this.ongId = ongId;
          this.proveedorService.getListarProveedor().subscribe({
            next: (fetchedProveedores) => {
              this.proveedores = fetchedProveedores.filter((proveedor:any) => !proveedor.validado);
              console.log('Proveedores:', this.proveedores);
            },
            error: (err) => console.error('Error fetching proveedores', err)
          });
        }
    });

    }
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
        this.showSuccess('Proveedor validado con exito');
        location.reload();

      },
      error: (err) => {
        console.error('Error validating proveedor', err);
        this.showAlert('Error validando proveedor');
      }
    });
  }


  confirmValidation(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de validar a este proveedor?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.validarProveedor(id);
      }

    });

  }


  confirmDelete(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarProveedor(id);
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
        this.showSuccess('Proveedor eliminado con exito');
      },
      error: (err) => {
        console.error('Error deleting proveedor', err);
        this.showAlert('Error eliminando proveedor');
      }
    });
  }

  private showAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  private showSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message,
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
