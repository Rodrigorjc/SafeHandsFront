// import {Component, OnInit} from '@angular/core';
// import {ActivatedRoute, RouterLink} from '@angular/router';
// import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
// import {AcontecimientoService} from '../services/acontecimiento.service';
// import {OngService} from '../services/ong.service';
// import {NgForOf, NgIf} from '@angular/common';
// import {UploadImgComponent} from '../upload-img/upload-img.component';
// import Swal from 'sweetalert2';
//
// @Component({
//   selector: 'app-crear-acontecimiento-ong',
//   imports: [
//     NgForOf,
//     NgIf,
//     RouterLink,
//     ReactiveFormsModule,
//     UploadImgComponent
//   ],
//   templateUrl: './crear-acontecimiento-ong.component.html',
//   styleUrl: './crear-acontecimiento-ong.component.css'
// })
// export class CrearAcontecimientoOngComponent implements OnInit {
//
//   ongId: string | null = null;
//   acontecimientos: any[] = [];
//   acontecimientoForm: FormGroup;
//   showForm: boolean = false;
//   imageUrl: string | null = null;
//
//   constructor(
//     private route: ActivatedRoute,
//     private fb: FormBuilder,
//     private acontecimientoService: AcontecimientoService,
//     private ongService: OngService,
//   ) {
//     this.acontecimientoForm = this.fb.group({
//       nombre: ['', Validators.required],
//       descripcion: ['', Validators.required],
//       ubicacion: ['', Validators.required],
//       img: [''],
//     });
//   }
//
//   ngOnInit() {
//     this.ongId = this.route.snapshot.paramMap.get('id');
//     this.acontecimientoService.getAcontecimiento().subscribe({
//       next: (data) => {
//         this.acontecimientos = data;
//         console.log('Acontecimientos:', data);
//       },
//       error: (err) => {
//         console.error('Error fetching acontecimientos', err);
//         Swal.fire('Error', `Error fetching acontecimientos: ${err.message}`, 'error');
//       }
//     });
//   }
//
//
//   toggleForm() {
//     this.showForm = !this.showForm;
//   }
//
//   crearAcontecimiento() {
//     if (this.acontecimientoForm.valid) {
//       const acontecimiento = this.acontecimientoForm.value;
//       this.acontecimientoService.crearAcontecimientoOng(acontecimiento).subscribe({
//         next: (response) => {
//           console.log('Acontecimiento creado:', response);
//           Swal.fire('Éxito', 'Acontecimiento creado exitosamente', 'success').then(() => {
//             location.reload(); //Para recargar la página
//           });
//         },
//         error: (err) => {
//           console.error('Error al crear acontecimiento:', err);
//           Swal.fire('Error', `Error al crear acontecimiento: ${err.message}`, 'error');
//         }
//       });
//     } else {
//       Swal.fire('Advertencia', 'Por favor, complete todos los campos requeridos.', 'warning');
//     }
//   }
//
//
//   eliminarAcontecimiento(acontecimientoId: number) {
//     Swal.fire({
//       title: '¿Estás seguro?',
//       text: '¿Quieres eliminar este acontecimiento?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Sí, eliminar',
//       cancelButtonText: 'No, cancelar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.confirmarEliminacion(acontecimientoId);
//       }
//     });
//   }
//
//   private confirmarEliminacion(acontecimientoId: number) {
//     this.acontecimientoService.eliminarAcontecimieto(acontecimientoId).subscribe({
//       next: (response) => {
//         this.acontecimientos = this.acontecimientos.filter(a => a.id !== acontecimientoId);
//         console.log('Acontecimiento eliminado:', response);
//         Swal.fire('Éxito', 'Acontecimiento eliminado exitosamente', 'success').then(() => {
//           location.reload();
//         });
//       },
//       error: (err) => {
//         console.error('Error al eliminar acontecimiento:', err);
//         Swal.fire('Error', `Error al eliminar acontecimiento: ${err.message}`, 'error');
//       }
//     });
//   }
//
//   onImageUploaded(imageUrl: string) {
//     this.imageUrl = imageUrl;
//     console.log('URL de la imagen recibida:', imageUrl);
//   }
//
// }
