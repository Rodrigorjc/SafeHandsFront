import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {Proveedor} from '../modelos/Proveedor';
import {ProveedorService} from '../services/proveedor.service';

@Component({
  selector: 'app-donaciones',
  standalone: true,
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.css'],
  imports: [CommonModule]
})
export class DonacionesComponent implements OnInit{
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

  constructor(private http: HttpClient, private proveedorService: ProveedorService) {
    // Cargar los datos desde el backend directamente en el constructor
    this.loadTotalDonaciones();
    this.loadTotalRecaudadoPorAcontecimiento();
    this.loadTotalRecaudadoPorProveedor();
  }

  ngOnInit(): void {
    // Llamamos al servicio para obtener la lista de proveedores
    this.proveedorService.getListarProveedores().subscribe({
      next: (fetchedProveedores: Proveedor[]) => {
        this.proveedor = fetchedProveedores;  // Asignamos la respuesta al array de proveedores
      },
      error: (err: any) => {
        console.error('Error fetching proveedores', err);  // Definir el tipo para err
      }
    });
  }

  // Método para cargar el total de donaciones desde el backend
  private loadTotalDonaciones() {
    this.http.get<number>('http://localhost:8081/api/total/donaciones').subscribe(
      (total) => {
        this.totalDonaciones = total;
      },
      (error) => {
        console.error('Error al cargar el total de donaciones:', error);
      }
    );
  }

  // Método para cargar el total recaudado por cada acontecimiento desde el backend
  private loadTotalRecaudadoPorAcontecimiento() {
    this.http
      .get<{ nombre: string; totalRecaudado: number }[]>('http://localhost:8081/api/acontecimientos/total')
      .subscribe(
        (data) => {
          this.acontecimientos = data;
        },
        (error) => {
          console.error('Error al cargar el total recaudado por acontecimiento:', error);
        }
      );
  }

  // Método para cargar el total recaudado por cada proveedor desde el backend
  private loadTotalRecaudadoPorProveedor() {
    this.http
      .get<{ nombre: string; totalRecaudado: number }[]>('http://localhost:8081/api/peticiones/proveedores')
      .subscribe(
        (data) => {
          this.proveedores = data;
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
    return acontecimiento ? acontecimiento.totalRecaudado : 0;
  }

  getImagenProveedor(): string {
    return this.imagenesPorProveedor[this.selectedProveedor] || '';
  }

  getDonacionesProveedor(): number {
    const proveedor = this.proveedores.find(p => p.nombre === this.selectedProveedor);
    return proveedor ? proveedor.totalRecaudado : 0;
  }

  protected readonly Object = Object;
}
