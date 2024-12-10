import { Component } from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import Swal from 'sweetalert2';
import {Pago} from '../modelos/TotalResponse';
import {Pedido} from '../modelos/Pedido';

interface Pagos{
  id: number|null;
  cuantia: number;
  estado: boolean;

  idPedido: number;
}

class PagosService {
}

@Component({
  selector: 'app-pagos-admin',
  imports: [
    NgForOf, CommonModule, FormsModule
  ],
  templateUrl: './pagos-admin.component.html',
  standalone: true,
  styleUrl: './pagos-admin.component.css'
})
export class PagosAdminComponent {
  pagosActual: Pago = this.crearPagoVacio();
  //pago que estamos editando

  //Pedidos simulados
  pedidos: Pedido[] = [];

  constructor(private pagosService: PagosService,
              private pedidosService: PedidoService) {}

  ngOnInit(): void {
    this.pagosService.getPago().subscribe({
      next: (pagos) => {
        this.pedidos = this.pedidos
        console.log('Pagos cargados', pagos);
      },
      error: (err) => console.error('Error al cargar los pagos', err),
    });
  }

  // Crear un acontecimiento vacío
  crearPagosVacio(): Pago {
    return {
      id: null,
      cuantia: 0,
      estado: false,
      idPedido: 0
    };
  }

  // Guardar un nuevo acontecimiento
  guardarPagos(): void {
    this.pagosService.crearPagos(this.pagosActual).subscribe({
      next: (pago) => {
        Swal.fire('Éxito', 'Pago creado exitosamente', 'success');

      },
      error: (err) => console.error('Error al guardar el pago', err),
    });

  }

  // editar un pago
}
