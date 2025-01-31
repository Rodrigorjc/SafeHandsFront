import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Proveedor } from '../modelos/Proveedor';
import { ProveedorService } from '../services/proveedor.service';
import { TotalService } from '../services/total.service';
import { AcontecimientoService } from '../services/acontecimiento.service';
import { Acontecimiento } from '../modelos/Acontecimiento';
import { Pago } from '../modelos/TotalResponse';
import {ProveedorInfo} from '../modelos/ProveedorInfo';
import {AconteciminetoInfo} from '../modelos/AconteciminetoInfo';
import {LineaPedidoService} from '../services/linea-pedido.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-donaciones',
  standalone: true,
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.css'],
  imports: [CommonModule]
})
export class DonacionesComponent implements OnInit {
  totalDonaciones: any = 0;
  acontecimientos: { nombre: string; totalRecaudado: number }[] = [];
  proveedores: { nombre: string; totalRecaudado: number }[] = [];
  proveedor: Proveedor[] = [];
  acontecimiento: Acontecimiento[] = [];

  rankingProveedores: { nombreProveedor: string; totalDonaciones: number }[] = [];
  maxDonaciones: number = 0;
  proveedoresRanking: ProveedorInfo[] = [];
  proveedorSeleccionadoId: string = '';
  proveedorSeleccionado: ProveedorInfo | null = null;
  aconteciminetos: AconteciminetoInfo[] = [];
  aconteciminetoSeleccionadoId: string = '';
  aconteciminetoSeleccionado: AconteciminetoInfo | null = null;



  isUserMenuVisible = false;
  isAcontecimientoMenuVisible = false;
  isProveedorMenuVisible = false;
  isModalVisible: boolean = false;

  selectedAcontecimiento: string = 'Selecciona un acontecimiento';
  selectedProveedor: string = 'Selecciona un proveedor';

  imagenesPorAcontecimiento: { [key: string]: string } = {
    valencia: 'image19.svg',
    florida: 'imagen22.jpg',
    ucrania: 'imagen23.jpg',
    hawaii: 'imagen24.jpg',
  };

  imagenesPorProveedor: { [key: string]: string } = {
    mediamarkt: 'mediamarkt.svg',
    dia: 'dia.jpg',
    'el corte inglés': 'corteingles.jpg',
    bricodepot: 'brico.png',
  };

  constructor(
    private http: HttpClient,
    private proveedorService: ProveedorService,
    private totalService: TotalService,
    private acontecimientoService: AcontecimientoService,
    private service: LineaPedidoService, private router: Router
  ) {}

  ngOnInit(): void {
    this.proveedorService.getListarProveedores().subscribe({
      next: (fetchedProveedores: Proveedor[]) => {
        this.proveedor = fetchedProveedores;
      },
      error: (err: any) => {
        console.error('Error fetching proveedores', err);
      }
    });
    this.acontecimientoService.getListarAcontecimientos().subscribe({
      next: (fetchedAcontecimiento: Acontecimiento[]) => {
        this.acontecimiento = fetchedAcontecimiento;
      },
      error: (err: any) => {
        console.error('Error fetching acontecimiento', err);
      }
    });

    this.totalService.getTotal().subscribe({
      next: (total: Pago) => {
        this.totalDonaciones = total.totalDonaciones;
      },
      error: (err) => {
        console.error('Error fetching total donaciones', err);
        this.totalDonaciones = 0;
      }
    });


    this.loadTotalRecaudadoPorAcontecimiento();
    this.loadTotalRecaudadoPorProveedor();
    this.getTotal();
    this.cargarRanking();
    this.cargarInfoProveedores();
    this.cargarInfoAcontecimiento();
  }

  private loadTotalRecaudadoPorAcontecimiento() {
    this.http
      .get<{ nombre: string; totalRecaudado: number }[]>('http://localhost:8081/acontecimiento/total')
      .subscribe(
        (data) => {
          this.acontecimientos = data.map(acontecimiento => ({
            nombre: acontecimiento.nombre.toLowerCase(),
            totalRecaudado: acontecimiento.totalRecaudado
          }));
        },
        (error) => {
          console.error('Error al cargar el total recaudado por acontecimiento:', error);
        },
      );
  }

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

  toggleUserMenu() {
    this.isUserMenuVisible = !this.isUserMenuVisible;
  }

  toggleAcontecimientoMenu() {
    this.isAcontecimientoMenuVisible = !this.isAcontecimientoMenuVisible;
  }

  toggleProveedorMenu() {
    this.isProveedorMenuVisible = !this.isProveedorMenuVisible;
  }

  selectAcontecimiento(acontecimiento: string) {
    const existe = this.acontecimientos.some(a => a.nombre === acontecimiento.toLowerCase());
    if (existe) {
      this.selectedAcontecimiento = acontecimiento;
      this.isAcontecimientoMenuVisible = false;
    } else {
      console.error('Acontecimiento no válido:', acontecimiento);
    }
  }

  seleccionarAcontecimiento(): void {
    console.log('ID seleccionado:', this.aconteciminetoSeleccionadoId); // Verifica el valor seleccionado
    if (this.aconteciminetoSeleccionadoId !== '') {
      this.aconteciminetoSeleccionado = this.aconteciminetos.find(
        (p) => p.id === +this.aconteciminetoSeleccionadoId
      ) || null;
      console.log('Proveedor seleccionado:', this.aconteciminetoSeleccionado); // Verifica el objeto seleccionado
    } else {
      this.aconteciminetoSeleccionado = null;
    }
  }

  closeModal() {
    this.isModalVisible = false;
  }

  selectProveedor(proveedor: string) {

    const existe = this.proveedores.some(p => p.nombre === proveedor.toLowerCase());
    if (existe) {
      this.selectedProveedor = proveedor;
      this.isProveedorMenuVisible = false;
    } else {
      console.error('Proveedor no válido:', proveedor);
    }
  }


  seleccionarProveedor(nombreProveedor: string): void {
    const proveedor = this.proveedores.find(
      (p) => p.nombre.toLowerCase() === nombreProveedor.toLowerCase()
    );

    if (proveedor) {
      this.proveedorSeleccionado = proveedor;
      console.log('Proveedor seleccionado:', this.proveedorSeleccionado);

      // Opcional: llama a la otra función si necesitas
      this.selectProveedor(nombreProveedor);
    } else {
      console.error('Nombre de proveedor no válido:', nombreProveedor);
      this.proveedorSeleccionado = null;
    }
  }


  getImagenAcontecimiento(): string {
    return this.imagenesPorAcontecimiento[this.selectedAcontecimiento.toLowerCase()] || '';
  }

  getDonacionesAcontecimiento(): any {
    const acontecimiento = this.acontecimientos.find(a => a.nombre === this.selectedAcontecimiento.toLowerCase());
    return acontecimiento ? acontecimiento.totalRecaudado : 0;
  }

  getImagenProveedor(): string {
    return this.imagenesPorProveedor[this.selectedProveedor.toLowerCase()] || '';
  }

  getDonacionesProveedor(): number {
    const proveedor = this.proveedores.find(p => p.nombre === this.selectedProveedor.toLowerCase());
    return proveedor ? proveedor.totalRecaudado : 0;
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

  cargarRanking(): void {
    this.service.obtenerRankingProveedores().subscribe((data: any) => {
      this.rankingProveedores = data;
      this.maxDonaciones = Math.max(
        ...this.rankingProveedores.map((p) => p.totalDonaciones)
      );
    });
  }

  cargarInfoProveedores(): void {
    this.service.obtenerInfoProveedores().subscribe((data: any) => {
      this.proveedores = data;
      console.log(this.proveedores);
    });
  }

  cargarInfoAcontecimiento(): void {
    this.service.obtenerInfoAcontecimineto().subscribe((data: any) => {
      this.aconteciminetos = data;
      console.log(this.aconteciminetos);
    });
  }

}
