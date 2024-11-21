import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {OngService} from '../services/ong.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-ong-asociar-acontecimiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ong-asociar-acontecimiento.component.html',
  styleUrl: './ong-asociar-acontecimiento.component.css'
})
export class OngAsociarAcontecimientoComponent implements OnInit {
  acontecimientos: any[] = [];
  ongs: any[] = [];
  ongId: string | null = null;
  asociarForm: FormGroup;
  alertMessage: string | null = null;
  successMessage: string | null = null


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private acontecimientoService: AcontecimientoService,
    private ongService: OngService,
    private authService: AuthService
  ) {
    this.asociarForm = this.fb.group({
      acontecimientoId: ['', Validators.required],
      ongId: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.ongId =this.route.snapshot.paramMap.get('id');// Get the logged-in ONG's ID
    this.asociarForm.patchValue({ ongId: this.ongId }); // Set the ONG ID in the form

    this.acontecimientoService.getAcontecimiento().subscribe({
      next: (data) => {
        this.acontecimientos = data;
        console.log('Acontecimientos:', data);
        console.log('OngId:', this.ongId);
      },
      error: (err) => {
        console.error('Error fetching acontecimientos', err);
        alert(`Error fetching acontecimientos: ${err.message}`);
      }
    });
  }

  asociarAcontecimiento() {
    if (this.asociarForm.invalid) {
      return;
    }

    const {acontecimientoId} = this.asociarForm.value;
    this.ongService.asociarAcontecimiento(acontecimientoId).subscribe(
      response => {
        console.log('Acontecimiento asociado:', response);
        this.showSuccess('Acontecimiento asociado exitosamente');
      },
      error => {
        console.error('Error al asociar acontecimiento:', error);
        this.showAlert('Error al asociar acontecimiento, el evento está ya asociado a esta ong');
      }
    );
  }
  private showAlert(message: string) {
      this.alertMessage = message;
      setTimeout(() => {
        this.alertMessage = null;
      }, 3000); // Clear the alert after 10 seconds
    }

  private showSuccess(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 3000); // Clear the success message after 10 seconds
  }
  }
