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

    const { acontecimientoId } = this.asociarForm.value;
    this.ongService.asociarAcontecimiento(acontecimientoId).subscribe(
      response => {
        console.log('Acontecimiento asociado:', response);
        alert('Acontecimiento asociado exitosamente');
      },
      error => {
        console.error('Error al asociar acontecimiento:', error);
        alert('Error al asociar acontecimiento');
      }
    );
  }}
