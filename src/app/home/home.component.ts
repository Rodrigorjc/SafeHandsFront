import {Component, OnInit} from '@angular/core';
import {DemoComponent} from '../demo/demo.component';
import {HeaderComponent} from '../header/header.component';
import {AcontecimientoService} from '../services/acontecimiento.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DemoComponent,
    HeaderComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  data: any[] = [];

  constructor(private acontecimientoService: AcontecimientoService) {}

  ngOnInit() {
    this.acontecimientoService.getAcontecimiento().subscribe((response) => {
      this.data = response;
    });
  }
}
