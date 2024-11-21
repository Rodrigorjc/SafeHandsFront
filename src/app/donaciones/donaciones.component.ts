import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Proveedor } from '../modelos/Proveedor';
import { ProveedorService } from '../services/proveedor.service';
import { TotalService } from '../services/total.service';
import { AcontecimientoService } from '../services/acontecimiento.service';

@Component({
  selector: 'app-donaciones',
  standalone: true,
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.css'],
  imports: [CommonModule]
})
export class DonacionesComponent implements OnInit {
  // Variables para mostrar datos del backend
  totalDonaciones: number = 0;
  acontecimientos: { nombre: string; totalRecaudado: number }[] = [];
  proveedores: { nombre: string; totalRecaudado: number }[] = [];
  proveedor: Proveedor[] = [];  // Usa el tipo de datos 'Proveedor'

  // Variables para controlar la visibilidad de menús y modal
  isUserMenuVisible = false;
  isAcontecimientoMenuVisible = false;
  isProveedorMenuVisible = false;
  isModalVisible: boolean = false;

  ranking: string[] = ['Proveedor 1', 'Proveedor 2', 'Proveedor 3'];
  selectedAcontecimiento: string = 'Valencia';
  selectedProveedor: string = 'MediaMarkt';

  imagenesPorAcontecimiento: { [key: string]: string } = {
    Valencia: '/image19.svg',
    Florida: '/imagen22.jpg',
    Ucrania: '/imagen23.jpg',
    Hawaii: '/imagen24.jpg',
  };

  imagenesPorProveedor: { [key: string]: string } = {
    MediaMarkt: 'mediamarkt.svg',
    Dia: 'dia.jpg',
    'El Corte Inglés': 'corteingles.jpg',
    Bricodepot: 'brico.png',
  };

  constructor(
    private http: HttpClient,
    private proveedorService: ProveedorService,
    private totalService: TotalService,
    private acontecimientoService: AcontecimientoService
  ) {}

  ngOnInit(): void {
    // Llamamos al servicio para obtener la lista de proveedores
    this.proveedorService.getListarProveedores().subscribe({
      next: (fetchedProveedores: Proveedor[]) => {
        this.proveedor = fetchedProveedores;
      },
      error: (err: any) => {
        console.error('Error fetching proveedores', err);
      }
    });

    // Llamamos al servicio para obtener el total de donaciones
    this.totalService.getTotal().subscribe({
      next: (total: any) => {
        console.log('Respuesta del servicio de total donaciones:', total); // Imprime el valor de la respuesta
        if (total && typeof total === 'number') {
          this.totalDonaciones = total;
        } else if (total && typeof total.totalDonaciones === 'number') {
          this.totalDonaciones = total.totalDonaciones;
        } else {
          console.error('El valor de totalDonaciones no es un número válido');
          this.totalDonaciones = 0;
        }
      },
      error: (err) => {
        console.error('Error fetching total donaciones', err);
        this.totalDonaciones = 0; // Asignamos 0 en caso de error
      }
    });

    // Llamamos al servicio para cargar los acontecimientos y proveedores
    this.loadTotalRecaudadoPorAcontecimiento();
    this.loadTotalRecaudadoPorProveedor();
  }

  // Metodo para cargar el total recaudado por cada acontecimiento desde el backend
  private loadTotalRecaudadoPorAcontecimiento() {
    this.http
      .get<{ nombre: string; totalRecaudado: number }[]>('http://localhost:8081/acontecimiento/total')
      .subscribe(
        (data) => {
          console.log('Datos de acontecimientos:', data);
          this.acontecimientos = data;
        },
        (error) => {
          console.error('Error al cargar el total recaudado por acontecimiento:', error);
        }
      );
  }

  // Metodo para cargar el total recaudado por cada proveedor desde el backend
  private loadTotalRecaudadoPorProveedor() {
    this.http
      .get<{ nombre: string; totalRecaudado: number }[]>('http://localhost:8081/peticiones/proveedores')
      .subscribe(
        (data) => {
          this.proveedores = data.map(proveedor => ({
            nombre: proveedor.nombre.toLowerCase(),
            totalRecaudado: proveedor.totalRecaudado
          }));
        },
        (error) => {
          console.error('Error al cargar el total recaudado por proveedor:', error);
        }
      );
  }

  // Métodos de interacción con el menú
  toggleUserMenu() {
    this.isUserMenuVisible = !this.isUserMenuVisible;
  }

  toggleAcontecimientoMenu() {
    this.isAcontecimientoMenuVisible = !this.isAcontecimientoMenuVisible;
  }

  toggleProveedorMenu() {
    this.isProveedorMenuVisible = !this.isProveedorMenuVisible;
  }

  // Métodos para seleccionar un acontecimiento o proveedor
  selectAcontecimiento(acontecimiento: string) {
    this.selectedAcontecimiento = acontecimiento;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  selectProveedor(proveedor: string) {
    this.selectedProveedor = proveedor;
    this.isProveedorMenuVisible = false; // Ocultar el menú tras la selección
  }

  // Métodos para obtener las imágenes y datos de donaciones
  getImagenAcontecimiento(): string {
    return this.imagenesPorAcontecimiento[this.selectedAcontecimiento] || '';
  }

  getDonacionesAcontecimiento(): number {
    const acontecimiento = this.acontecimientos.find(a => a.nombre === this.selectedAcontecimiento);
    // Aseguramos que el valor devuelto sea un número
    return acontecimiento ? Number(acontecimiento.totalRecaudado) || 0 : 0;
  }

  getImagenProveedor(): string {
    return this.imagenesPorProveedor[this.selectedProveedor] || '';
  }

  getDonacionesProveedor(): number {
    const proveedor = this.proveedores.find(p => p.nombre === this.selectedProveedor.toLowerCase());
    return proveedor ? proveedor.totalRecaudado : 0;
  }

  protected readonly Object = Object;
  protected readonly isNaN = isNaN;
}
