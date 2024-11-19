import { Component, OnInit } from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

interface CustomJwtPayload {
  userId: string;
  rol: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isUserMenuVisible = false;
  isNavMenuVisible = false;
  isMenuVisible = false;
  img: Observable<any> = of('');

  constructor(private authService: AuthService, private router: Router) {}

  toggleUserMenu() {
    this.isUserMenuVisible = !this.isUserMenuVisible;
  }

  mostarMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  mostarNav() {
    this.isNavMenuVisible = !this.isNavMenuVisible;
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    if (token) {
      let rol = localStorage.getItem('rol');
      if (rol === 'ONG') {
        this.img = of(''); // or any other Observable value
      } else if (rol === 'PROVEEDOR') {
        this.img = of(''); // or any other Observable value
      } else if (rol === 'CLIENTE') {
        let userId: string | null = localStorage.getItem('userId');
        this.img = this.authService.obtenerImgCliente(of(userId));
      } else {
        this.img = of(''); // or any other Observable value
      }
    }
  }
}
