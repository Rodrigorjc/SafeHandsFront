// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Acontecimiento } from '../modelos/Acontecimiento';
// import { AcontecimientoService } from '../services/acontecimiento.service';
// import { Router } from '@angular/router';
//
// @Component({
//   selector: 'app-acontecimiento-admin',
//   templateUrl: './acontecimiento-admin.component.html',
//   styleUrls: ['./acontecimiento-admin.component.css'],
//   standalone: true,
//   imports: [CommonModule]
// })
// export class AcontecimientoAdminComponent implements OnInit {
//   acontecimientos: Acontecimiento[] = [];
//
//   constructor(private service: AcontecimientoService, private router: Router) {}
//
//   ngOnInit() {
//     this.listado();
//   }
//
//   listado() {
//     this.service.getAcontecimientos().subscribe({
//       next: (data: Acontecimiento[]) => {
//         this.acontecimientos = data;
//       },
//       error: (error) => {
//         console.error('Error al obtener datos', error);
//       }
//     });
//   }
//
//   editarAcontecimiento(id: number) {
//     this.router.navigate([`/admin/editar/${id}`]);
//   }
//
//   eliminarAcontecimiento(id: number) {
//     this.service.eliminarAcontecimiento(id).subscribe(() => {
//       this.listado();
//     });
//   }
//
//   crearAcontecimiento() {
//     this.router.navigate(['/admin/crear']);
//   }
// }
