import { Component, OnInit } from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {ActualizarHeaderService} from '../services/actualizar-header.service';

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

  constructor(private authService: AuthService, private router: Router, private actualizar: ActualizarHeaderService) {}

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
    this.refreshHeader();
    this.actualizar.refreshHeader$.subscribe(() => {
      this.refreshHeader();
    });
  }

  refreshHeader() {
    let token = localStorage.getItem('token');
    let userId: string | null = localStorage.getItem('userId');
    if (token) {
      let rol = localStorage.getItem('rol');
      if (rol === 'ONG') {
        this.authService.obtenerImgOng(of(userId)).subscribe(imgUrl => {
          if (imgUrl === null) {
            this.img = of("https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png");
          } else {
            this.img = of(imgUrl);
          }
        });
      } else if (rol === 'PROVEEDOR') {
        this.authService.obtenerImgProveedor(of(userId)).subscribe(imgUrl => {
          if (imgUrl === null) {
            this.img = of("https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png");
          } else {
            this.img = of(imgUrl);
          }
        });
      } else if (rol === 'CLIENTE') {
        this.authService.obtenerImgCliente(of(userId)).subscribe(imgUrl => {
          if (imgUrl === null) {
            this.img = of("https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png");
          } else {
            this.img = of(imgUrl);
          }
        });
      } else {
        // Default image
        this.img = of("https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png");
      }
    } else {
      this.img = of("https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png");
    }
  }
}
